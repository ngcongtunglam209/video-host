import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FORECAST_DATE, KINGDOM, STATION } from "./data";
import { colors, FONT_STACK, RAINBOW } from "./theme";

export const RainbowArc: React.FC<{ progress: number; cx: number; cy: number; radius: number }> = ({
  progress,
  cx,
  cy,
  radius,
}) => (
  <svg width={1920} height={1080} style={{ position: "absolute" }}>
    {RAINBOW.map((c, i) => {
      const rr = radius - i * 34;
      return (
        <path
          key={c}
          d={`M ${cx - rr} ${cy} A ${rr} ${rr} 0 0 1 ${cx + rr} ${cy}`}
          fill="none"
          stroke={c}
          strokeWidth={36}
          strokeOpacity={0.75}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
        />
      );
    })}
  </svg>
);

export const DriftingClouds: React.FC<{ count: number; opacity: number; top: number; spread: number }> = ({
  count,
  opacity,
  top,
  spread,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {Array.from({ length: count }, (_, i) => {
        const w = 260 + (i % 3) * 120;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: ((i * 520 + frame * (0.8 + (i % 3) * 0.4)) % 2400) - 400,
              top: top + ((i * 137) % spread),
              width: w,
              height: w * 0.36,
              borderRadius: 999,
              background: "#ffffff",
              opacity,
              boxShadow: `${w * 0.18}px ${-w * 0.1}px 0 ${w * 0.04}px #ffffff, ${-w * 0.16}px ${-w * 0.06}px 0 0 #ffffff`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const rainbowText: React.CSSProperties = {
  background: `linear-gradient(90deg, ${RAINBOW.join(", ")})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  // The gradient only fills the element box; leave room for stacked
  // diacritics (Ả, Ở) above the cap height.
  paddingTop: "0.3em",
  marginTop: "-0.3em",
};

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = (delay: number) => spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const sunY = interpolate(enter(0), [0, 1], [700, 230]);
  const arc = interpolate(frame, [10, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const title = enter(12);
  const word = spring({ frame: frame - 24, fps, config: { damping: 10 } });
  const sub = enter(36);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_STACK,
        background: "linear-gradient(#2f7fe0 0%, #79b8ff 55%, #ffd6a5 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 1380,
          top: sunY,
          width: 230,
          height: 230,
          borderRadius: "50%",
          background: "radial-gradient(circle, #fff6c2 0%, #ffd23f 70%)",
          boxShadow: "0 0 120px 50px rgba(255, 220, 90, 0.6)",
          transform: `rotate(${frame}deg)`,
        }}
      />
      <RainbowArc progress={arc} cx={1500} cy={1080} radius={720} />
      <DriftingClouds count={6} opacity={0.9} top={50} spread={90} />
      <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 140, paddingTop: 120 }}>
        <div
          style={{
            color: colors.text,
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: title,
            textShadow: "0 4px 20px rgba(0, 40, 100, 0.5)",
          }}
        >
          {STATION}
        </div>
        <div
          style={{
            color: colors.text,
            fontSize: 132,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 12,
            opacity: title,
            transform: `translateY(${(1 - title) * 40}px)`,
            textShadow: "0 8px 30px rgba(0, 40, 100, 0.45)",
          }}
        >
          Dự báo thời tiết
        </div>
        <div
          style={{
            ...rainbowText,
            fontSize: 150,
            fontWeight: 800,
            lineHeight: 1.1,
            textTransform: "uppercase",
            transform: `scale(${word})`,
            transformOrigin: "left center",
            filter: "drop-shadow(0 6px 0 rgba(255, 255, 255, 0.9))",
          }}
        >
          Giả tưởng
        </div>
        <div
          style={{
            color: "#10305e",
            fontSize: 44,
            fontWeight: 700,
            marginTop: 26,
            opacity: sub,
            transform: `translateY(${(1 - sub) * 30}px)`,
          }}
        >
          {KINGDOM} · {FORECAST_DATE}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
