type Point = [number, number];

const POINTS = 60;
const CENTER = 50;
const RADIUS = 34;

function polar(angle: number, radius: number): Point {
  const rad = ((angle - 90) * Math.PI) / 180;
  return [CENTER + radius * Math.cos(rad), CENTER + radius * Math.sin(rad)];
}

function regular(sides: number, radius = RADIUS): Point[] {
  return Array.from({ length: sides }, (_, i) => polar((360 / sides) * i, radius));
}

function star(tips: number): Point[] {
  return Array.from({ length: tips * 2 }, (_, i) => polar((180 / tips) * i, i % 2 === 0 ? RADIUS + 4 : RADIUS * 0.45));
}

function sample(corners: Point[]): Point[] {
  const edges = corners.map((from, i) => {
    const to = corners[(i + 1) % corners.length];
    return { from, to, length: Math.hypot(to[0] - from[0], to[1] - from[1]) };
  });
  const total = edges.reduce((sum, edge) => sum + edge.length, 0);
  const out: Point[] = [];
  let edge = 0;
  let walked = 0;
  for (let i = 0; i < POINTS; i++) {
    const target = (total / POINTS) * i;
    while (walked + edges[edge].length < target) walked += edges[edge++].length;
    const { from, to, length } = edges[edge];
    const t = (target - walked) / length;
    out.push([from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t]);
  }
  return out;
}

function toPath(points: Point[]): string {
  return `M${points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join("L")}Z`;
}

// Every shape has the same point count, starts at the top and runs clockwise, so SMIL can morph between them.
const SHAPES = [regular(POINTS), regular(3), regular(4, RADIUS * 0.95), regular(6), star(5)].map(sample).map(toPath);

export const MORPH_VALUES = [...SHAPES, SHAPES[0]].join(";");
export const MORPH_KEY_TIMES = SHAPES.map((_, i) => (i / SHAPES.length).toFixed(3)).concat("1").join(";");
export const MORPH_SPLINES = SHAPES.map(() => "0.65 0 0.35 1").join(";");
export const MORPH_FIRST = SHAPES[0];
