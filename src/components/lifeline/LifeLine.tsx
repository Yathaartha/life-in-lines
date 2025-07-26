import React, { useMemo, useState, useEffect, useRef } from "react";
import * as d3 from "d3";

// --- TYPE DEFINITIONS ---
interface DataPoint {
  x: Date; // X is now a Date
  y: number;
}

interface AreaChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
}

interface TooltipData {
  x: number;
  y: number;
  visible: boolean;
  dataPoint: DataPoint | null;
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
      d3.select(ref.current).call(d3.axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
};

const AxisLeft = ({ scale }: { scale: d3.ScaleLinear<number, number> }) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current).call(d3.axisLeft(scale));
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
  const [tooltip, setTooltip] = useState<TooltipData>({
    visible: false,
    x: 0,
    y: 0,
    dataPoint: null,
  });

  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // --- D3 SCALES & GENERATORS ---
  const xScale = useMemo(
    () =>
      // Use scaleTime for dates
      d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.x) as [Date, Date])
        .range([0, innerWidth]),
    [data, innerWidth]
  );

  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([-100, 100]) // Fixed domain as requested
        .range([innerHeight, 0]),
    [innerHeight]
  );

  // Path generators remain the same, but now use the new scales
  const lineGenerator = useMemo(
    () =>
      d3
        .line<DataPoint>()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))
        .curve(d3.curveNatural),
    [xScale, yScale]
  );
  const areaGenerator = useMemo(
    () =>
      d3
        .area<DataPoint>()
        .x((d) => xScale(d.x))
        .y0(yScale(0))
        .y1((d) => yScale(d.y))
        .curve(d3.curveNatural),
    [xScale, yScale]
  );

  // Note: For simplicity, a single area generator is used with clipping.
  // The 'areaAboveGenerator' and 'areaBelowGenerator' logic from before is functionally identical.

  return (
    <div style={{ position: "relative", width, height }}>
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <defs>
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
        </defs>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* ✅ RENDER AXES */}
          <AxisBottom
            scale={xScale}
            transform={`translate(0, ${innerHeight})`}
          />
          <AxisLeft scale={yScale} />

          {/* Areas and Line */}
          <path
            d={areaGenerator(data) || ""}
            fill="lightgreen"
            clipPath="url(#clip-above)"
          />
          <path
            d={areaGenerator(data) || ""}
            fill="salmon"
            clipPath="url(#clip-below)"
          />
          <path
            d={lineGenerator(data) || ""}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />

          {/* Data Point Dots */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={xScale(d.x)}
              cy={yScale(d.y)}
              r={5}
              fill={d.y >= 0 ? "lightgreen" : "salmon"}
              stroke="black"
              strokeWidth="1.5"
              style={{ cursor: "pointer" }}
              onMouseOver={() =>
                setTooltip({
                  visible: true,
                  x: xScale(d.x) + margin.left,
                  y: yScale(d.y) + margin.top,
                  dataPoint: d,
                })
              }
              onMouseOut={() =>
                setTooltip((prev) => ({ ...prev, visible: false }))
              }
            />
          ))}
        </g>
      </svg>

      {/* Tooltip Element */}
      {tooltip.visible && tooltip.dataPoint && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            left: tooltip.x,
            top: tooltip.y,
          }}>
          <strong>Date:</strong> {tooltip.dataPoint.x.toLocaleDateString()}
          <br />
          <strong>Value:</strong> {tooltip.dataPoint.y.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default AreaChart;
