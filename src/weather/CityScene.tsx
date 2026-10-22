import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { City } from "./data";
import { BackEffect, FrontEffect } from "./effects";
import { Landscape } from "./Landscape";
import { colors, FONT_STACK } from "./theme";
import { WeatherIcon } from "./WeatherIcon";

const formatTemp = (t: number) => `${t < 0 ? "−" : ""}${Math.abs(t)}°`;

export const CityScene: React.FC<{ city: City; index: number; total: number }> = ({
  city,
  index,
  total,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = (delay: number) => spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const panelIn = enter(4);
  const iconIn = spring({ frame: frame - 14, fps, config: { damping: 12 } });
  const shownTemp = Math.round(
    interpolate(frame, [16, 46], [0, city.temp], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );

  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: `linear-gradient(${city.sky[0]}, ${city.sky[1]})` }} />
      <BackEffect effect={city.effect} />
      <Landscape effect={city.effect} colors={city.ground} />
      <FrontEffect effect={city.effect} />

      <div
        style={{
          position: "absolute",
          left: 90,
          top: 130,
          width: 800,
          padding: "44px 52px",
          borderRadius: 36,
          background: colors.panel,
          border: `2px solid ${colors.panelBorder}`,
          backdropFilter: "blur(14px)",
          color: colors.text,
          opacity: panelIn,
          transform: `translateX(${(1 - panelIn) * -120}px)`,
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              background: city.accent,
              color: "#10142a",
              padding: "6px 18px",
              borderRadius: 999,
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            Khu vực {index + 1}/{total}
          </span>
          <span style={{ fontSize: 26, fontWeight: 600, color: colors.muted }}>Hôm nay</span>
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1, marginTop: 20 }}>{city.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 26, marginTop: 18 }}>
          <div style={{ transform: `scale(${iconIn})` }}>
            <WeatherIcon kind={city.effect} size={150} />
          </div>
          <div>
            <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 1 }}>{formatTemp(shownTemp)}</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: colors.muted, marginTop: 6 }}>
              Thấp nhất {formatTemp(city.low)}
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: city.accent,
            marginTop: 18,
            opacity: enter(20),
          }}
        >
          {city.condition}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 28 }}>
          {city.stats.map((stat, i) => {
            const statIn = enter(28 + i * 6);
            return (
              <div
                key={stat.label}
                style={{
                  flex: 1,
                  padding: "16px 20px",
                  borderRadius: 20,
                  background: "rgba(255, 255, 255, 0.1)",
                  opacity: statIn,
                  transform: `translateY(${(1 - statIn) * 24}px)`,
                }}
              >
                <div style={{ fontSize: 22, color: colors.muted, fontWeight: 600 }}>{stat.label}</div>
                <div style={{ fontSize: 30, fontWeight: 800, marginTop: 4, whiteSpace: "nowrap" }}>{stat.value}</div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 28,
            paddingLeft: 22,
            borderLeft: `6px solid ${city.accent}`,
            fontSize: 30,
            lineHeight: 1.4,
            fontWeight: 600,
            opacity: enter(48),
          }}
        >
          <span style={{ color: city.accent, fontWeight: 800 }}>Lời khuyên: </span>
          {city.advice}
        </div>
      </div>
    </AbsoluteFill>
  );
};
