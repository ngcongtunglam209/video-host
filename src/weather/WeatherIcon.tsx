import { IconKind } from "./data";
import { RAINBOW } from "./theme";

// Small illustrated weather symbols on a 100×100 grid.

const Cloud: React.FC<{ fill?: string; dy?: number }> = ({ fill = "#ffffff", dy = 0 }) => (
  <g transform={`translate(0 ${dy})`} fill={fill}>
    <circle cx="38" cy="44" r="16" />
    <circle cx="58" cy="38" r="20" />
    <circle cx="74" cy="50" r="13" />
    <rect x="24" y="44" width="62" height="19" rx="9.5" />
  </g>
);

const Sun: React.FC<{ cx: number; cy: number; r: number; color?: string }> = ({
  cx,
  cy,
  r,
  color = "#ffc93c",
}) => (
  <g>
    {Array.from({ length: 8 }, (_, i) => {
      const a = (i * Math.PI) / 4;
      return (
        <line
          key={i}
          x1={cx + Math.cos(a) * (r + 5)}
          y1={cy + Math.sin(a) * (r + 5)}
          x2={cx + Math.cos(a) * (r + 13)}
          y2={cy + Math.sin(a) * (r + 13)}
          stroke={color}
          strokeWidth={5}
          strokeLinecap="round"
        />
      );
    })}
    <circle cx={cx} cy={cy} r={r} fill={color} />
  </g>
);

const Snowflake: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
  <g stroke="#ffffff" strokeWidth={4} strokeLinecap="round">
    {[0, 60, 120].map((deg) => (
      <line
        key={deg}
        x1={cx - Math.cos((deg * Math.PI) / 180) * r}
        y1={cy - Math.sin((deg * Math.PI) / 180) * r}
        x2={cx + Math.cos((deg * Math.PI) / 180) * r}
        y2={cy + Math.sin((deg * Math.PI) / 180) * r}
      />
    ))}
  </g>
);

const Note: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => (
  <g fill={color} stroke={color}>
    <ellipse cx={x} cy={y} rx={7} ry={5.5} transform={`rotate(-20 ${x} ${y})`} />
    <line x1={x + 6} y1={y - 2} x2={x + 6} y2={y - 26} strokeWidth={3.5} />
    <path d={`M ${x + 6} ${y - 26} q 10 4 12 14`} fill="none" strokeWidth={3.5} />
  </g>
);

export const WeatherIcon: React.FC<{ kind: IconKind; size: number }> = ({ kind, size }) => {
  let body: React.ReactNode;
  switch (kind) {
    case "candy":
      body = (
        <>
          <Cloud fill="#ffe0f0" dy={-8} />
          {["#ff5fa8", "#ffd23f", "#3ddc84", "#3fa7ff"].map((c, i) => (
            <rect
              key={c}
              x={28 + i * 14}
              y={66 + (i % 2) * 10}
              width={10}
              height={14}
              rx={5}
              fill={c}
              transform={`rotate(${i * 25 - 30} ${33 + i * 14} ${73 + (i % 2) * 10})`}
            />
          ))}
        </>
      );
      break;
    case "storm":
      body = (
        <>
          <Cloud fill="#5b6280" dy={-8} />
          <path d="M 56 56 L 42 78 L 54 78 L 46 96 L 68 70 L 56 70 L 64 56 Z" fill="#ffd84a" />
        </>
      );
      break;
    case "fog":
      body = (
        <>
          <Cloud fill="#e8d8ff" dy={-10} />
          {[66, 78, 90].map((y, i) => (
            <line
              key={y}
              x1={20 + i * 6}
              y1={y}
              x2={84 - i * 4}
              y2={y}
              stroke="#c79bff"
              strokeWidth={6}
              strokeLinecap="round"
            />
          ))}
        </>
      );
      break;
    case "meteor":
      body = (
        <>
          <path d="M 70 20 A 26 26 0 1 0 84 62 A 20 20 0 1 1 70 20 Z" fill="#fff4c2" />
          <line x1="14" y1="30" x2="44" y2="56" stroke="#9fd8ff" strokeWidth={4} strokeLinecap="round" />
          <circle cx="46" cy="58" r="5" fill="#ffffff" />
          <line x1="22" y1="62" x2="40" y2="78" stroke="#9fd8ff" strokeWidth={3} strokeLinecap="round" />
          <circle cx="42" cy="80" r="3.5" fill="#ffffff" />
        </>
      );
      break;
    case "sand":
      body = (
        <>
          <Sun cx={40} cy={40} r={18} color="#ff9f1c" />
          <Note x={66} y={84} color="#ffffff" />
        </>
      );
      break;
    case "snowUp":
      body = (
        <>
          <Snowflake cx={44} cy={62} r={22} />
          <path d="M 78 70 L 78 22 M 66 34 L 78 20 L 90 34" stroke="#7fd3ff" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
      break;
    case "rainbow":
      body = (
        <>
          {RAINBOW.map((c, i) => (
            <path
              key={c}
              d={`M ${12 + i * 5} 70 A ${38 - i * 5} ${38 - i * 5} 0 0 1 ${88 - i * 5} 70`}
              stroke={c}
              strokeWidth={5}
              fill="none"
            />
          ))}
          <g transform="translate(-10 26) scale(0.55)">
            <Cloud />
          </g>
          <g transform="translate(52 26) scale(0.55)">
            <Cloud />
          </g>
        </>
      );
      break;
    case "cookie":
      body = (
        <>
          <Cloud fill="#ffffff" dy={-10} />
          {[
            [32, 76],
            [56, 86],
            [76, 72],
          ].map(([x, y]) => (
            <g key={x}>
              <circle cx={x} cy={y} r={9} fill="#d99a4e" />
              <circle cx={x - 3} cy={y - 2} r={1.8} fill="#5a3416" />
              <circle cx={x + 3} cy={y + 3} r={1.8} fill="#5a3416" />
            </g>
          ))}
        </>
      );
      break;
    case "honeySun":
      body = (
        <>
          <Sun cx={50} cy={44} r={22} color="#ffb400" />
          <path d="M 50 72 C 44 82 44 90 50 92 C 56 90 56 82 50 72 Z" fill="#e88a00" />
        </>
      );
      break;
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: "visible" }}>
      {body}
    </svg>
  );
};
