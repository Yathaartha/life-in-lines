import * as d3 from "d3";
import React, { useEffect, useMemo, useRef, useState } from "react";

import {
    autoUpdate, flip, offset, shift, useFloating, useHover, useInteractions
} from "@floating-ui/react";

import { EventContent, EventFooter, EventModalHeader, EventModalWrapper } from "./LifeLine.css";

// --- TYPE DEFINITIONS ---
interface DataPoint {
  x: Date; // X is now a Date
  y: number;
  name: string;
  description?: string;
}

interface AreaChartProps {
  data: DataPoint[];
  width?: number | string;
  height?: number | string;
}

interface TooltipData {
  dataPoint: DataPoint | null;
  id: number | null;
}

interface ZoomState {
  k: number; // zoom scale factor
  x: number; // pan/translate x
}

// --- HELPER COMPONENTS FOR AXES ---
const AxisBottom = ({
  scale,
  transform,
}: {
  scale: d3.ScaleTime<number, number>;
  transform: string;
}) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const domain = scale.domain();
      const domainRange = domain[1].getTime() - domain[0].getTime();
      const oneDayInMs = 24 * 60 * 60 * 1000;

      // Calculate appropriate tick count based on visible range
      // At max zoom (1 day), show only 1 tick
      const daysVisible = domainRange / oneDayInMs;
      let tickCount: number;

      if (daysVisible <= 1) {
        tickCount = 1; // Only 1 label for 1 day
      } else if (daysVisible <= 7) {
        tickCount = Math.ceil(daysVisible); // One per day for up to a week
      } else if (daysVisible <= 30) {
        tickCount = Math.ceil(daysVisible / 2); // Every 2 days for a month
      } else {
        tickCount = Math.ceil(daysVisible / 7); // Weekly for longer ranges
      }

      const axis = d3
        .axisBottom(scale)
        .ticks(tickCount)
        .tickFormat((d) => {
          const date = d as Date;
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        });

      // Remove duplicate labels
      d3.select(ref.current).call(axis);

      // Filter out duplicate labels after rendering
      const ticks = d3.select(ref.current).selectAll(".tick");
      let lastLabel = "";
      ticks.each(function () {
        const text = d3.select(this).select("text");
        const label = text.text();
        if (label === lastLabel) {
          d3.select(this).remove();
        } else {
          lastLabel = label;
        }
      });
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
};

const AxisLeft = ({ scale }: { scale: d3.ScaleLinear<number, number> }) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const axis = d3.axisLeft(scale).tickSizeOuter(0).tickSizeInner(0);

      d3.select(ref.current).call(axis);

      // Hide the domain line (vertical axis line)
      d3.select(ref.current).select(".domain").style("display", "none");

      // Align text properly with tick marks
      // Use the same y position as the tick marks by reading the transform
      d3.select(ref.current)
        .selectAll(".tick")
        .each(function () {
          const tick = d3.select(this);
          const text = tick.select("text");
          const line = tick.select("line");
          const y2 = line.attr("y2");

          if (y2 !== null) {
            text
              .style("text-anchor", "end")
              .attr("dx", "-0.5em")
              .attr("y", y2) // Align text y position with tick mark y2
              .attr("dy", "0.35em"); // Small adjustment for visual centering
          }
        });
    }
  }, [scale]);

  return <g ref={ref} />;
};

// --- MAIN CHART COMPONENT ---
const AreaChart: React.FC<AreaChartProps> = ({
  data,
  width = 700,
  height = 400,
}) => {
  const { refs, floatingStyles, context, update } = useFloating({
    placement: "top",
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context);

  const { getFloatingProps } = useInteractions([hover]);

  const [tooltip, setTooltip] = useState<TooltipData>({
    dataPoint: null,
    id: null,
  });
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const zoomContainerRef = useRef<SVGGElement>(null);
  const [zoomState, setZoomState] = useState<ZoomState>({ k: 1, x: 0 });

  const margin = { top: 20, right: 30, bottom: 2, left: 30 };
  const innerHeight =
    typeof height === "number"
      ? height - margin.top - margin.bottom
      : (window.visualViewport?.height ?? 600) -
        margin.top -
        margin.bottom -
        90;

  // Calculate viewport width (the visible area)
  const viewportWidth =
    typeof width === "number" ? width : window.innerWidth || 1920;
  const innerWidth = viewportWidth - margin.left - margin.right;

  // Normalize dates to midnight (start of day) for proper alignment
  const normalizedData = useMemo(() => {
    return data.map((d) => {
      const date = new Date(d.x);
      date.setHours(0, 0, 0, 0); // Set to midnight
      return { ...d, x: date };
    });
  }, [data]);

  // Get the original date extent for zoom calculations
  const dateExtent = d3.extent(normalizedData, (d) => d.x) as [Date, Date];
  const dateRange = dateExtent[1].getTime() - dateExtent[0].getTime();
  const oneDayInMs = 24 * 60 * 60 * 1000;

  // Calculate maximum zoom level (when zoomed in, show minimum 1 day)
  const maxZoom = dateRange / oneDayInMs;

  // --- D3 SCALES & GENERATORS ---
  // Base scale for the full timeline (visible viewport)
  const xScaleBase = useMemo(
    () => d3.scaleTime().domain(dateExtent).range([0, innerWidth]),
    [innerWidth, dateExtent]
  );

  // Apply zoom and pan to x-axis - timeline style
  // Use D3's zoom transform to modify the scale
  const xScale = useMemo(() => {
    const scale = xScaleBase.copy();
    const baseDomain = scale.domain();
    const minTime = baseDomain[0].getTime();
    const maxTime = baseDomain[1].getTime();
    const baseRange = maxTime - minTime;

    // Ensure zoom level is valid
    const k = Math.max(1, Math.min(zoomState.k, maxZoom));

    // Calculate the visible domain based on zoom
    // Zoom in = smaller time range visible, zoom out = larger time range visible
    const visibleRange = Math.max(oneDayInMs, baseRange / k); // Minimum 1 day

    // Calculate pan offset in time units
    // zoomState.x is the pan offset in pixels at current zoom
    // We need to convert this to time units at the base (unzoomed) scale
    const pixelToTimeRatio = baseRange / innerWidth;
    const panOffsetInTime = -zoomState.x * pixelToTimeRatio;

    // Calculate the center point of the visible area
    const baseCenter = minTime + baseRange / 2;
    const visibleCenter = baseCenter + panOffsetInTime;

    // Calculate new domain boundaries
    let visibleStart = visibleCenter - visibleRange / 2;
    let visibleEnd = visibleCenter + visibleRange / 2;

    // Clamp to data bounds
    if (visibleRange >= baseRange) {
      // If visible range is larger than data range, show all data
      visibleStart = minTime;
      visibleEnd = maxTime;
    } else {
      // Ensure we stay within bounds
      if (visibleStart < minTime) {
        visibleStart = minTime;
        visibleEnd = Math.min(maxTime, visibleStart + visibleRange);
      }
      if (visibleEnd > maxTime) {
        visibleEnd = maxTime;
        visibleStart = Math.max(minTime, visibleEnd - visibleRange);
      }
    }

    // Final safety check
    visibleStart = Math.max(
      minTime,
      Math.min(visibleStart, maxTime - oneDayInMs)
    );
    visibleEnd = Math.max(minTime + oneDayInMs, Math.min(visibleEnd, maxTime));

    scale.domain([new Date(visibleStart), new Date(visibleEnd)]);
    return scale;
  }, [xScaleBase, zoomState.k, zoomState.x, innerWidth, maxZoom, oneDayInMs]);

  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([-10, 10]) // Fixed domain as requested
        .range([innerHeight, 0]),
    [innerHeight]
  );

  // Path generators - using Catmull-Rom for smooth curves that pass through data points
  const lineGenerator = useMemo(
    () =>
      d3
        .line<DataPoint>()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))
        .curve(d3.curveCatmullRom.alpha(0.5)),
    [xScale, yScale]
  );
  const areaGenerator = useMemo(
    () =>
      d3
        .area<DataPoint>()
        .x((d) => xScale(d.x))
        .y0(yScale(0))
        .y1((d) => yScale(d.y))
        .curve(d3.curveCatmullRom.alpha(0.5)),
    [xScale, yScale]
  );

  // Generate vertical grid lines (one per day)
  const verticalGridLines = useMemo(() => {
    const domain = xScale.domain();
    const startDate = new Date(domain[0]);
    const endDate = new Date(domain[1]);
    const lines: { x: number; date: Date }[] = [];

    // Start from midnight of the start date
    const currentDate = new Date(startDate);
    currentDate.setHours(0, 0, 0, 0);

    while (currentDate <= endDate) {
      const x = xScale(currentDate);
      if (x >= 0 && x <= innerWidth) {
        lines.push({ x, date: new Date(currentDate) });
      }
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return lines;
  }, [xScale, innerWidth]);

  // Generate horizontal grid lines (every 2 units, excluding 0)
  const horizontalGridLines = useMemo(() => {
    const lines: number[] = [];
    for (let y = -10; y <= 10; y += 2) {
      if (y !== 0) {
        // Skip 0 as it's the solid ground line
        lines.push(y);
      }
    }
    return lines;
  }, []);

  // Setup zoom and pan behavior (timeline style)
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, maxZoom]) // Minimum zoom 1x, maximum zoom to show 1 day
      .on("zoom", (event) => {
        const transform = event.transform;
        setZoomState({
          k: transform.k,
          x: transform.x,
        });
      });

    // Initialize zoom transform
    svg.call(zoom.transform, d3.zoomIdentity);

    svg.call(zoom);

    return () => {
      svg.on("zoom", null);
    };
  }, [maxZoom]);

  // Note: For simplicity, a single area generator is used with clipping.
  // The 'areaAboveGenerator' and 'areaBelowGenerator' logic from before is functionally identical.

  return (
    <>
      <div
        style={{
          position: "relative",
          width,
          height,
          overflow: "hidden",
          zIndex: 2,
        }}>
        <svg
          ref={svgRef}
          width={width}
          height={height}
          style={{ display: "block", cursor: "grab" }}
          onMouseDown={() => {
            if (svgRef.current) {
              svgRef.current.style.cursor = "grabbing";
            }
          }}
          onMouseUp={() => {
            if (svgRef.current) {
              svgRef.current.style.cursor = "grab";
            }
          }}
          onMouseLeave={() => {
            if (svgRef.current) {
              svgRef.current.style.cursor = "grab";
            }
          }}>
          <defs>
            <clipPath id="clip-chart">
              <rect x="0" y="0" width={innerWidth} height={innerHeight} />
            </clipPath>
            <clipPath id="clip-above">
              <rect x="0" y="0" width={innerWidth} height={yScale(0)} />
            </clipPath>
            <clipPath id="clip-below">
              <rect
                x="0"
                y={yScale(0)}
                width={innerWidth}
                height={innerHeight - yScale(0)}
              />
            </clipPath>
            {/* Gradient for positive area (above zero) - lighter at zero line, darker at top */}
            <linearGradient
              id="gradient-above"
              gradientUnits="objectBoundingBox"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#059669" stopOpacity="1" />
            </linearGradient>
            {/* Gradient for negative area (below zero) - lighter at zero line, darker at bottom */}
            <linearGradient
              id="gradient-below"
              gradientUnits="objectBoundingBox"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#BE123C" stopOpacity="1" />
            </linearGradient>
          </defs>
          <g
            ref={zoomContainerRef}
            transform={`translate(${margin.left}, ${margin.top})`}>
            {/* ✅ RENDER AXES */}
            <AxisBottom
              scale={xScale}
              transform={`translate(0, ${innerHeight})`}
            />
            <AxisLeft scale={yScale} />

            {/* Vertical grid lines - one per day */}
            <g opacity="0.3">
              {verticalGridLines.map((line, i) => (
                <line
                  key={`v-grid-${i}`}
                  x1={line.x}
                  y1="0"
                  x2={line.x}
                  y2={innerHeight}
                  stroke="#D1D5DB"
                  strokeWidth="1"
                />
              ))}
            </g>

            {/* Horizontal grid lines - every 2 units */}
            <g opacity="0.2">
              {horizontalGridLines.map((y, i) => (
                <line
                  key={`h-grid-${i}`}
                  x1="0"
                  y1={yScale(y)}
                  x2={innerWidth}
                  y2={yScale(y)}
                  stroke="#D1D5DB"
                  strokeWidth="1"
                />
              ))}
            </g>

            {/* Zero line - solid ground line (darker grey) */}
            <line
              x1="0"
              y1={yScale(0)}
              x2={innerWidth}
              y2={yScale(0)}
              stroke="#9CA3AF"
              strokeWidth="1.5"
            />

            {/* Areas and Line */}
            <path
              d={areaGenerator(normalizedData) || ""}
              fill="url(#gradient-above)"
              clipPath="url(#clip-above)"
            />
            <path
              d={areaGenerator(normalizedData) || ""}
              fill="url(#gradient-below)"
              clipPath="url(#clip-below)"
            />
            <path
              d={lineGenerator(normalizedData) || ""}
              fill="none"
              stroke="grey"
              strokeWidth="2"
              clipPath="url(#clip-chart)"
            />

            {/* Data Point Dots */}
            <g clipPath="url(#clip-chart)">
              {normalizedData.map((d, i) => (
                <circle
                  key={i}
                  cx={xScale(d.x)}
                  cy={yScale(d.y)}
                  r={hoveredDot === i ? 6.5 : 5}
                  fill="#ffffff"
                  stroke={d.y >= 0 ? "#10B981" : "#F43F5E"}
                  strokeWidth="1.5"
                  style={{
                    cursor: "pointer",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                    transition: "scale 0.3s ease",
                  }}
                  ref={(node) => {
                    if (node && tooltip?.id === i) {
                      refs.setReference(node);
                      update();
                    }
                  }}
                  onMouseEnter={(e) => {
                    refs.setReference(e.currentTarget);
                    setTooltip({ dataPoint: d, id: i });
                    setHoveredDot(i);
                  }}
                  onMouseLeave={() => {
                    setTooltip({ dataPoint: null, id: null });
                    setHoveredDot(null);
                  }}
                />
              ))}
            </g>
          </g>
        </svg>
      </div>
      {/* Tooltip Element */}
      {tooltip.dataPoint && (
        <EventModalWrapper
          ref={refs.setFloating}
          {...getFloatingProps({})}
          style={{
            ...floatingStyles,
            zIndex: 100,
            background: "white",
            // color: "white",
          }}>
          <EventModalHeader>{tooltip.dataPoint.name}</EventModalHeader>
          <EventContent>
            <EventContent>
              {tooltip.dataPoint.description || "N/A"}
            </EventContent>
            <EventFooter>
              <div>
                <strong>Date:</strong> {tooltip.dataPoint.x.toDateString()}
              </div>
              <div>
                <strong>Value:</strong> {tooltip.dataPoint.y}
              </div>
            </EventFooter>
          </EventContent>
        </EventModalWrapper>
      )}
    </>
  );
};

export default AreaChart;
