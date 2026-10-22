import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { Effect } from "./data";

// Animated weather layers. Everything is derived from the frame number and
// seeded random() calls, so renders are deterministic.

const W = 1920;
const H = 1080;

const r = (seed: string) => random(seed);
const range = (n: number) => Array.from({ length: n }, (_, i) => i);

// Falling (or rising) position that wraps around the frame.
const loop = (start: number, speed: number, frame: number, span: number) =>
  (((start + frame * speed) % span) + span) % span;

const CandyRain: React.FC = () => {
  const frame = useCurrentFrame();
  const palette = ["#ff5fa8", "#ffd23f", "#3ddc84", "#3fa7ff", "#ff8a3d", "#b46bff"];
  return (
    <svg width={W} height={H} style={{ position: "absolute" }}>
      {range(90).map((i) => {
        const w = 16 + r(`cw${i}`) * 18;
        const x = r(`cx${i}`) * W + Math.sin(frame / 25 + i) * 12;
        const y = loop(r(`cy${i}`) * H, 5 + r(`cs${i}`) * 6, frame, H + 120) - 60;
        const rot = r(`cr${i}`) * 360 + frame * (r(`cv${i}`) * 6 - 3);
        return (
          <rect
            key={i}
            x={x - w / 2}
            y={y - w * 0.7}
            width={w}
            height={w * 1.4}
            rx={w / 2}
            fill={palette[i % palette.length]}
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={2}
            transform={`rotate(${rot} ${x} ${y})`}
          />
        );
      })}
    </svg>
  );
};

const StormClouds: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {range(7).map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: ((i * 330 + frame * (0.6 + i * 0.1)) % (W + 600)) - 400,
            top: -80 + (i % 3) * 70,
            width: 700,
            height: 260,
            borderRadius: "50%",
            background: i % 2 ? "#2b2f4d" : "#3a3f5f",
            filter: "blur(30px)",
            opacity: 0.9,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const Dragon: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const x = interpolate(frame, [0, durationInFrames], [W + 350, 600]);
  const y = 330 + Math.sin(frame / 18) * 40;
  const flap = Math.sin(frame / 4);
  return (
    <svg width={W} height={H} style={{ position: "absolute" }}>
      <g transform={`translate(${x} ${y}) scale(-1.5 1.5)`} fill="#0b0d1c">
        {/* Tail */}
        <path d="M -40 0 C -110 -10 -150 30 -210 10 L -230 -5 L -215 18 C -150 45 -100 20 -40 10 Z" />
        {/* Wings */}
        <path
          d="M -20 -5 L -60 -90 L -30 -60 L -10 -100 L 5 -55 L 25 -80 L 20 -5 Z"
          transform={`scale(1 ${0.35 + 0.65 * Math.abs(flap)}) ${flap < 0 ? "scale(1 -1)" : ""}`}
        />
        {/* Body, neck and head */}
        <ellipse cx="0" cy="0" rx="50" ry="16" />
        <path d="M 40 -6 C 70 -20 80 -30 95 -30 L 120 -24 L 98 -16 C 85 -12 70 0 45 8 Z" />
        <path d="M 96 -30 L 92 -44 L 102 -31 Z" />
      </g>
    </svg>
  );
};

const Rain: React.FC<{ count: number; color: string }> = ({ count, color }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={W} height={H} style={{ position: "absolute" }}>
      {range(count).map((i) => {
        const x = r(`rx${i}`) * (W + 300);
        const y = loop(r(`ry${i}`) * H, 38 + r(`rs${i}`) * 14, frame, H + 200) - 100;
        return (
          <line
            key={i}
            x1={x}
            y1={y}
            x2={x - 18}
            y2={y + 60}
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

const LIGHTNING_PERIOD = 75;

const Lightning: React.FC = () => {
  const frame = useCurrentFrame();
  const cycle = Math.floor(frame / LIGHTNING_PERIOD);
  const t = frame % LIGHTNING_PERIOD;
  const flash = interpolate(t, [0, 2, 4, 6, 12], [0, 0.85, 0.15, 0.6, 0], {
    extrapolateRight: "clamp",
  });
  if (flash === 0) {
    return null;
  }
  let x = 1050 + r(`lx${cycle}`) * 650;
  let y = 60;
  const points = [`${x},${y}`];
  for (let i = 0; i < 9; i++) {
    x += (r(`lb${cycle}-${i}`) - 0.5) * 120;
    y += 55 + r(`ly${cycle}-${i}`) * 30;
    points.push(`${x},${y}`);
  }
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "#e8ecff", opacity: flash * 0.5 }} />
      <svg width={W} height={H} style={{ position: "absolute", opacity: flash > 0.1 ? 1 : 0 }}>
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke="#fff6c8"
          strokeWidth={14}
          strokeLinejoin="round"
          opacity={0.35}
        />
        <polyline points={points.join(" ")} fill="none" stroke="#ffffff" strokeWidth={5} strokeLinejoin="round" />
      </svg>
    </AbsoluteFill>
  );
};

const Fog: React.FC<{ layer: number }> = ({ layer }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {range(6).map((i) => {
        const seed = `f${layer}-${i}`;
        const left = r(`${seed}x`) * W - 500 + Math.sin(frame / 70 + i * 2) * 140 + frame * (layer ? 1.2 : -0.8);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left,
              top: (layer ? 620 : 300) + r(`${seed}y`) * 300,
              width: 900,
              height: 220,
              borderRadius: "50%",
              background: layer ? "#e7d2ff" : "#cdb2f5",
              filter: "blur(45px)",
              opacity: layer ? 0.6 : 0.45,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Sparkles: React.FC<{ count: number; color: string; maxY: number }> = ({ count, color, maxY }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={W} height={H} style={{ position: "absolute" }}>
      {range(count).map((i) => {
        const twinkle = 0.25 + 0.75 * Math.abs(Math.sin(frame / (14 + r(`st${i}`) * 20) + i));
        return (
          <circle
            key={i}
            cx={r(`sx${i}`) * W}
            cy={r(`sy${i}`) * maxY}
            r={1 + r(`sr${i}`) * 2.4}
            fill={color}
            opacity={twinkle}
          />
        );
      })}
    </svg>
  );
};

const Moon: React.FC = () => (
  <div
    style={{
      position: "absolute",
      right: 220,
      top: 110,
      width: 150,
      height: 150,
      borderRadius: "50%",
      background: "radial-gradient(circle at 35% 35%, #fffbe6, #e8e2c4)",
      boxShadow: "0 0 80px 20px rgba(255, 248, 210, 0.35)",
    }}
  />
);

const METEOR_EVERY = 8;
const METEOR_LIFE = 26;

const Meteors: React.FC = () => {
  const frame = useCurrentFrame();
  const newest = Math.floor(frame / METEOR_EVERY);
  const ids = range(Math.ceil(METEOR_LIFE / METEOR_EVERY) + 1).map((k) => newest - k);
  return (
    <svg width={W} height={H} style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="meteor-tail">
          <stop offset="0" stopColor="#9fd8ff" stopOpacity={0} />
          <stop offset="1" stopColor="#ffffff" stopOpacity={1} />
        </linearGradient>
      </defs>
      {ids
        .filter((k) => k >= 0)
        .map((k) => {
          const t = frame - k * METEOR_EVERY;
          if (t > METEOR_LIFE) {
            return null;
          }
          const angle = 140 + r(`ma${k}`) * 20;
          const rad = (angle * Math.PI) / 180;
          const dist = t * (26 + r(`mv${k}`) * 10);
          const x = 300 + r(`mx${k}`) * 1600 + Math.cos(rad) * dist;
          const y = 20 + r(`my${k}`) * 350 + Math.sin(rad) * dist;
          const len = 160 + r(`ml${k}`) * 160;
          const opacity = interpolate(t, [0, 4, METEOR_LIFE - 8, METEOR_LIFE], [0, 1, 1, 0]);
          return (
            <g key={k} transform={`translate(${x} ${y}) rotate(${angle})`} opacity={opacity}>
              <rect x={-len} y={-2} width={len} height={4} rx={2} fill="url(#meteor-tail)" />
              <circle r={4.5} fill="#ffffff" />
            </g>
          );
        })}
    </svg>
  );
};

const DesertSun: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame / 15) * 0.04;
  return (
    <div
      style={{
        position: "absolute",
        right: 200,
        top: 90,
        width: 260,
        height: 260,
        borderRadius: "50%",
        background: "radial-gradient(circle, #fff6c2 0%, #ffd23f 55%, #ff9f1c 100%)",
        boxShadow: "0 0 140px 60px rgba(255, 190, 60, 0.55)",
        transform: `scale(${pulse})`,
      }}
    />
  );
};

const SandStorm: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={W} height={H} style={{ position: "absolute" }}>
      {range(160).map((i) => {
        const x = W + 100 - loop(r(`sdx${i}`) * W, 22 + r(`sds${i}`) * 18, frame, W + 300);
        const y = 300 + r(`sdy${i}`) * 780 + Math.sin(frame / 10 + i) * 18;
        return (
          <line
            key={i}
            x1={x}
            y1={y}
            x2={x + 30 + r(`sdl${i}`) * 50}
            y2={y - 4}
            stroke="#fff1cf"
            strokeOpacity={0.55}
            strokeWidth={2 + r(`sdw${i}`) * 2}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

const SingingNotes: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {range(14).map((i) => {
        const x = W + 100 - loop(r(`nx${i}`) * W, 7 + r(`ns${i}`) * 4, frame, W + 200);
        const y = 420 + r(`ny${i}`) * 380 + Math.sin(frame / 12 + i) * 50;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              fontFamily: "DejaVu Sans",
              fontSize: 56 + r(`nz${i}`) * 40,
              color: "#ffffff",
              opacity: 0.85,
              textShadow: "0 4px 18px rgba(160, 70, 0, 0.6)",
              transform: `rotate(${Math.sin(frame / 8 + i) * 15}deg)`,
            }}
          >
            {i % 2 ? "♪" : "♫"}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Aurora: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={W} height={H} style={{ position: "absolute", filter: "blur(28px)" }}>
      {["#7cffcb", "#7fd3ff", "#c79bff"].map((c, i) => {
        const pts = range(25).map((k) => {
          const x = k * 80;
          const y = 180 + i * 70 + Math.sin(k / 3 + frame / 40 + i) * 60;
          return `${x},${y}`;
        });
        return (
          <polyline
            key={c}
            points={pts.join(" ")}
            fill="none"
            stroke={c}
            strokeWidth={60}
            strokeOpacity={0.45}
          />
        );
      })}
    </svg>
  );
};

const RisingSnow: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={W} height={H} style={{ position: "absolute" }}>
      {range(130).map((i) => {
        const big = i < 16;
        const y = H + 40 - loop(r(`uy${i}`) * H, 2 + r(`us${i}`) * 3 + (big ? 1 : 0), frame, H + 80);
        const x = r(`ux${i}`) * W + Math.sin(frame / 20 + i) * 30;
        if (!big) {
          return <circle key={i} cx={x} cy={y} r={2.5 + r(`ur${i}`) * 4} fill="#ffffff" opacity={0.9} />;
        }
        const size = 18 + r(`uz${i}`) * 14;
        return (
          <g
            key={i}
            transform={`translate(${x} ${y}) rotate(${frame * 2 + i * 20})`}
            stroke="#ffffff"
            strokeWidth={3}
            strokeLinecap="round"
          >
            {[0, 60, 120].map((deg) => (
              <line
                key={deg}
                x1={-Math.cos((deg * Math.PI) / 180) * size}
                y1={-Math.sin((deg * Math.PI) / 180) * size}
                x2={Math.cos((deg * Math.PI) / 180) * size}
                y2={Math.sin((deg * Math.PI) / 180) * size}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

// Layers drawn behind the ground silhouette.
export const BackEffect: React.FC<{ effect: Effect }> = ({ effect }) => {
  switch (effect) {
    case "storm":
      return (
        <>
          <StormClouds />
          <Dragon />
        </>
      );
    case "fog":
      return <Fog layer={0} />;
    case "meteor":
      return (
        <>
          <Sparkles count={220} color="#ffffff" maxY={820} />
          <Moon />
          <Meteors />
        </>
      );
    case "sand":
      return <DesertSun />;
    case "snowUp":
      return <Aurora />;
    case "candy":
      return null;
  }
};

// Layers drawn in front of the ground silhouette.
export const FrontEffect: React.FC<{ effect: Effect }> = ({ effect }) => {
  switch (effect) {
    case "candy":
      return <CandyRain />;
    case "storm":
      return (
        <>
          <Rain count={140} color="rgba(200, 210, 255, 0.45)" />
          <Lightning />
        </>
      );
    case "fog":
      return (
        <>
          <Fog layer={1} />
          <Sparkles count={60} color="#f3e6ff" maxY={H} />
        </>
      );
    case "sand":
      return (
        <>
          <SandStorm />
          <SingingNotes />
        </>
      );
    case "snowUp":
      return <RisingSnow />;
    case "meteor":
      return null;
  }
};
