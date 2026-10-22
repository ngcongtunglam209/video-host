import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { stories } from "./data";
import { colors, FONT_STACK } from "./theme";

const SPEED = 4; // px per frame
const text = stories.map((s) => s.headline).join("   •   ");

export const Ticker: React.FC<{ showFrom: number; hideFrom: number; fade: number }> = ({
  showFrom,
  hideFrom,
  fade,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [showFrom - fade, showFrom, hideFrom, hideFrom + fade],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  if (opacity === 0) {
    return null;
  }

  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK, opacity }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 76,
          display: "flex",
          alignItems: "center",
          background: "rgba(5, 9, 18, 0.92)",
          borderTop: `3px solid ${colors.accent}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: "0 32px",
            background: colors.accent,
            color: colors.bg,
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          Tin nhanh
        </div>
        <div style={{ flex: 1, overflow: "hidden", height: "100%", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              color: colors.text,
              fontSize: 28,
              fontWeight: 600,
              transform: `translateX(${1600 - (frame - showFrom + fade) * SPEED}px)`,
            }}
          >
            {`${text}   •   ${text}   •   ${text}`}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
