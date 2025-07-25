import type { LifeEvent } from "../../views/home/HomePage";

type AreaFill = {
  id: string;
  data: LifeEvent[];
};

export function getAreaFills(data: LifeEvent[]): {
  positiveArea: AreaFill;
  negativeArea: AreaFill;
} {
  if (!data || data.length === 0) {
    return {
      positiveArea: { id: "positive-area", data: [] },
      negativeArea: { id: "negative-area", data: [] },
    };
  }

  const positive: LifeEvent[] = [];
  const negative: LifeEvent[] = [];

  for (const point of data) {
    if (point.y >= 0) {
      positive.push(point);
      negative.push({ x: point.x, y: 0, name: point.name });
    } else {
      negative.push(point);
      positive.push({ x: point.x, y: 0, name: point.name });
    }
  }

  return {
    positiveArea: {
      id: "positive-area",
      data: positive,
    },
    negativeArea: {
      id: "negative-area",
      data: negative,
    },
  };
}

