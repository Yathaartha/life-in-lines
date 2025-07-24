import { ResponsiveLine } from "@nivo/line";
import type { LifeEvent } from "../../views/home/HomePage";

export const LifeLine = ({ data }: { data: LifeEvent[] }) => {
  return (
    <ResponsiveLine /* or Line for fixed dimensions */
      curve="monotoneX"
      data={[
        {
          id: "life Events",
          data: data,
        },
      ]}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      yScale={{
        type: "linear",
        min: -100,
        max: 100,
        stacked: true,
        reverse: false,
      }}
      xScale={{
        type: "linear",
        min: 0,
        max: data.length - 1,
        stacked: true,
        reverse: false,
      }}
      axisBottom={{ legend: "transportation", legendOffset: 36 }}
      axisLeft={{ legend: "count", legendOffset: -40 }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "seriesColor" }}
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 100,
          itemWidth: 80,
          itemHeight: 22,
          symbolShape: "circle",
        },
      ]}
    />
  );
};

