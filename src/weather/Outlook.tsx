import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { outlook, WARNING } from "./data";
import { DriftingClouds } from "./Intro";
import { colors, FONT_STACK } from "./theme";
import { WeatherIcon } from "./WeatherIcon";

export const Outlook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = (delay: number) => spring({ frame: frame - delay, fps, config: { damping: 200 } });
  // The narration reaches the warning a little past the middle of the clip.
  const warningIn = enter(Math.round(durationInFrames * 0.5));
  const blink = 0.75 + 0.25 * Math.sin(frame / 5);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_STACK,
        background: "linear-gradient(#3b8fe8 0%, #9fd0ff 100%)",
        overflow: "hidden",
      }}
    >
      <DriftingClouds count={5} opacity={0.45} top={740} spread={60} />
      <div style={{ position: "absolute", left: 120, top: 70, color: colors.text, opacity: enter(0) }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4, color: colors.accent, textTransform: "uppercase" }}>
          Xu hướng
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, textShadow: "0 6px 24px rgba(0, 40, 100, 0.4)" }}>
          Dự báo 3 ngày tới
        </div>
      </div>

      <div style={{ position: "absolute", left: 120, right: 120, top: 260, display: "flex", gap: 48 }}>
        {outlook.map((d, i) => {
          const cardIn = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 14 } });
          return (
            <div
              key={d.day}
              style={{
                flex: 1,
                height: 470,
                borderRadius: 36,
                background: "rgba(10, 30, 70, 0.7)",
                border: `2px solid ${colors.panelBorder}`,
                color: colors.text,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "36px 30px",
                textAlign: "center",
                opacity: Math.min(1, cardIn),
                transform: `translateY(${(1 - cardIn) * 80}px)`,
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 800 }}>{d.day}</div>
              <div style={{ marginTop: 16, transform: `translateY(${Math.sin(frame / 14 + i) * 6}px)` }}>
                <WeatherIcon kind={d.icon} size={170} />
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, marginTop: 14, color: colors.accent, minHeight: 84 }}>
                {d.condition}
              </div>
              <div style={{ fontSize: 52, fontWeight: 800, marginTop: 6 }}>
                {d.high}°<span style={{ color: colors.muted, fontWeight: 600, fontSize: 40 }}> / {d.low}°</span>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          bottom: 70,
          display: "flex",
          alignItems: "center",
          gap: 30,
          padding: "26px 40px",
          borderRadius: 28,
          background: `rgba(120, 10, 40, ${0.85 * blink})`,
          border: "4px solid #ffd23f",
          color: colors.text,
          opacity: warningIn,
          transform: `translateY(${(1 - warningIn) * 200}px)`,
        }}
      >
        <svg width={80} height={72} viewBox="0 0 80 72" style={{ flexShrink: 0 }}>
          <path d="M 40 4 L 76 68 L 4 68 Z" fill="#ffd23f" stroke="#ffd23f" strokeWidth={6} strokeLinejoin="round" />
          <rect x={36} y={24} width={8} height={24} rx={4} fill="#5a0a20" />
          <circle cx={40} cy={57} r={5} fill="#5a0a20" />
        </svg>
        <div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#ffd23f", textTransform: "uppercase", letterSpacing: 2 }}>
            {WARNING.level}
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, marginTop: 4 }}>{WARNING.text}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

