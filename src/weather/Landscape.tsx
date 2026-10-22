import { random, useCurrentFrame } from "remotion";
import { Effect } from "./data";

const W = 1920;
const H = 1080;

// A ground silhouette: smooth rolling hills, or jagged peaks.
const ridge = (seed: string, base: number, amp: number, jagged: boolean) => {
  const pts: string[] = [];
  if (jagged) {
    let x = -40;
    let up = true;
    while (x < W + 120) {
      const y = base - (up ? amp * (0.5 + random(`${seed}${x}`) * 0.5) : amp * random(`${seed}${x}l`) * 0.25);
      pts.push(`${x},${y}`);
      x += 90 + random(`${seed}${x}s`) * 110;
      up = !up;
    }
  } else {
    const f1 = 160 + random(`${seed}a`) * 140;
    const f2 = 60 + random(`${seed}b`) * 50;
    const p1 = random(`${seed}c`) * 6;
    for (let x = 0; x <= W; x += 20) {
      const y = base - amp * (0.65 * Math.sin(x / f1 + p1) + 0.35 * Math.sin(x / f2 + p1 * 2));
      pts.push(`${x},${y}`);
    }
  }
  return `M -40 ${H} L ${pts.join(" L ")} L ${W + 120} ${H} Z`;
};

const shapes: Record<Effect, { jagged: boolean; back: [number, number]; front: [number, number] }> = {
  candy: { jagged: false, back: [800, 70], front: [930, 50] },
  storm: { jagged: true, back: [760, 330], front: [920, 200] },
  fog: { jagged: false, back: [760, 110], front: [900, 80] },
  meteor: { jagged: false, back: [800, 90], front: [880, 40] },
  sand: { jagged: false, back: [820, 60], front: [930, 45] },
  snowUp: { jagged: true, back: [780, 260], front: [940, 120] },
};

const Lollipops: React.FC = () => (
  <g>
    {[180, 520, 1500, 1760].map((x, i) => {
      const top = 800 - (i % 2) * 40;
      return (
        <g key={x}>
          <rect x={x - 5} y={top} width={10} height={240} fill="#fff4f9" />
          <circle cx={x} cy={top} r={52} fill={["#ff5fa8", "#ffd23f", "#3fa7ff", "#3ddc84"][i]} />
          <circle cx={x} cy={top} r={34} fill="none" stroke="#ffffff" strokeWidth={8} opacity={0.75} />
          <circle cx={x} cy={top} r={14} fill="none" stroke="#ffffff" strokeWidth={8} opacity={0.75} />
        </g>
      );
    })}
  </g>
);

const Lake: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <defs>
        <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a4f8a" />
          <stop offset="1" stopColor="#0d1433" />
        </linearGradient>
      </defs>
      <rect x={0} y={900} width={W} height={180} fill="url(#lake)" />
      {Array.from({ length: 14 }, (_, i) => {
        const y = 920 + i * 11;
        const x = (random(`lk${i}`) * W + frame * (i % 2 ? 1.5 : -1.5)) % W;
        return (
          <rect key={i} x={x} y={y} width={120 + random(`lw${i}`) * 220} height={3} rx={1.5} fill="#e6eeff" opacity={0.35} />
        );
      })}
    </g>
  );
};

export const Landscape: React.FC<{ effect: Effect; colors: [string, string] }> = ({ effect, colors }) => {
  const s = shapes[effect];
  return (
    <svg width={W} height={H} style={{ position: "absolute" }}>
      <path d={ridge(`${effect}-back`, s.back[0], s.back[1], s.jagged)} fill={colors[0]} />
      {effect === "meteor" ? <Lake /> : null}
      {effect === "candy" ? <Lollipops /> : null}
      {effect !== "meteor" ? (
        <path d={ridge(`${effect}-front`, s.front[0], s.front[1], s.jagged)} fill={colors[1]} />
      ) : null}
    </svg>
  );
};
