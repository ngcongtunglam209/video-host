import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { cities, KINGDOM } from "./data";
import { colors, FONT_STACK } from "./theme";
import { WeatherIcon } from "./WeatherIcon";

// The map is drawn in a 1600×900 box placed at (MAP_X, MAP_Y) at 1:1 scale,
// so city coordinates double as screen offsets.
const MAP_X = 160;
const MAP_Y = 150;

const CONTINENT =
  "M 300 220 C 420 120 640 90 820 80 C 1000 70 1180 130 1260 240 C 1340 350 1300 470 1200 540 " +
  "C 1100 610 980 600 900 680 C 820 760 640 800 500 760 C 360 720 250 640 230 520 C 210 400 200 300 300 220 Z";
const ISLAND = "M 1220 700 C 1240 650 1350 640 1390 690 C 1430 740 1390 800 1310 800 C 1240 800 1200 750 1220 700 Z";

// Cold front: a quadratic curve with triangles pointing south.
const FRONT = { x0: 330, y0: 10, cx: 820, cy: 70, x1: 1300, y1: 10 };
const frontPoint = (t: number) => {
  const { x0, y0, cx, cy, x1, y1 } = FRONT;
  const u = 1 - t;
  return {
    x: u * u * x0 + 2 * u * t * cx + t * t * x1,
    y: u * u * y0 + 2 * u * t * cy + t * t * y1,
    dx: 2 * u * (cx - x0) + 2 * t * (x1 - cx),
    dy: 2 * u * (cy - y0) + 2 * t * (y1 - cy),
  };
};

const PressureCenter: React.FC<{ x: number; y: number; letter: string; color: string; label: string }> = ({
  x,
  y,
  letter,
  color,
  label,
}) => {
  const frame = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 1, 2].map((i) => {
        const grow = ((frame / 40 + i / 3) % 1);
        return (
          <circle
            key={i}
            r={40 + grow * 110}
            fill="none"
            stroke={color}
            strokeWidth={3}
            opacity={1 - grow}
          />
        );
      })}
      <circle r={40} fill={color} />
      <text y={16} textAnchor="middle" fontSize={48} fontWeight={800} fill="#ffffff">
        {letter}
      </text>
      <text y={-62} textAnchor="middle" fontSize={24} fontWeight={700} fill="#ffffff">
        {label}
      </text>
    </g>
  );
};

export const MapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mapIn = spring({ frame, fps, config: { damping: 200 } });
  const frontProgress = interpolate(frame, [20, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lowX = interpolate(frame, [0, 300], [1500, 1400], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_STACK,
        background: "radial-gradient(ellipse at 50% 40%, #1f5d9c 0%, #0f2f5e 60%, #0a1d3f 100%)",
      }}
    >
      <div style={{ position: "absolute", left: 90, top: 46, color: colors.text, opacity: mapIn }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4, color: colors.accent, textTransform: "uppercase" }}>
          Toàn cảnh
        </div>
        <div style={{ fontSize: 56, fontWeight: 800 }}>{KINGDOM}</div>
      </div>

      <svg
        width={1600}
        height={900}
        viewBox="0 0 1600 900"
        style={{
          position: "absolute",
          left: MAP_X,
          top: MAP_Y,
          overflow: "visible",
          opacity: mapIn,
          transform: `scale(${0.94 + mapIn * 0.06})`,
          fontFamily: FONT_STACK,
        }}
      >
        <defs>
          <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9f2ff" />
            <stop offset="0.3" stopColor="#7fcf9a" />
            <stop offset="0.75" stopColor="#4fae78" />
            <stop offset="1" stopColor="#e8b765" />
          </linearGradient>
        </defs>
        <path d={CONTINENT} fill="url(#land)" stroke="#ffffff" strokeWidth={5} strokeOpacity={0.8} />
        <path d={ISLAND} fill="#ffb3d9" stroke="#ffffff" strokeWidth={5} strokeOpacity={0.8} />
        <text x={1060} y={860} fontSize={30} fontStyle="italic" fontWeight={600} fill="#9fc7ff">
          Biển Đường Phèn
        </text>

        {/* Cold air from the north. */}
        <path
          d={`M ${FRONT.x0} ${FRONT.y0} Q ${FRONT.cx} ${FRONT.cy} ${FRONT.x1} ${FRONT.y1}`}
          fill="none"
          stroke="#3fa7ff"
          strokeWidth={7}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - frontProgress}
        />
        {Array.from({ length: 12 }, (_, i) => {
          const t = (i + 0.5) / 12;
          if (t > frontProgress) {
            return null;
          }
          const p = frontPoint(t);
          const angle = (Math.atan2(p.dy, p.dx) * 180) / Math.PI;
          return (
            <path
              key={i}
              d="M -16 0 L 16 0 L 0 24 Z"
              fill="#3fa7ff"
              transform={`translate(${p.x} ${p.y}) rotate(${angle})`}
            />
          );
        })}

        {/* Cotton-candy low moving in from the sea. */}
        <path
          d={`M ${lowX - 40} 600 Q 1250 640 1050 560`}
          fill="none"
          stroke="#ff8fc6"
          strokeWidth={6}
          strokeDasharray="22 16"
          strokeDashoffset={-frame * 2}
          opacity={interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
        <PressureCenter x={lowX} y={600} letter="T" color="#ff5fa8" label="Áp thấp kẹo bông" />
      </svg>

      {cities.map((city, i) => {
        const pop = spring({ frame: frame - 50 - i * 14, fps, config: { damping: 11 } });
        const bob = Math.sin(frame / 16 + i) * 4;
        return (
          <div
            key={city.name}
            style={{
              position: "absolute",
              left: MAP_X + city.map.x,
              top: MAP_Y + city.map.y + bob,
              transform: `translate(-50%, -70%) scale(${pop})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <WeatherIcon kind={city.effect} size={96} />
            <div
              style={{
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(10, 16, 40, 0.8)",
                border: `2px solid ${city.accent}`,
                color: colors.text,
                fontSize: 22,
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              {city.name}
              <span style={{ color: city.accent, fontWeight: 800, fontSize: 26 }}>
                {city.temp < 0 ? "−" : ""}
                {Math.abs(city.temp)}°
              </span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
