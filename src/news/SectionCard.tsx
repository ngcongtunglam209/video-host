import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Region } from "./data";
import { colors, FONT_STACK, regionColor, regionLabel } from "./theme";

export const SectionCard: React.FC<{ region: Region; count: number }> = ({
  region,
  count,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const wipe = interpolate(enter, [0, 1], [0, 100]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        fontFamily: FONT_STACK,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundColor: regionColor[region],
          clipPath: `inset(0 ${100 - wipe}% 0 0)`,
        }}
      />
      <div
        style={{
          color: colors.text,
          fontSize: 150,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: 6,
          opacity: enter,
          transform: `scale(${0.9 + enter * 0.1})`,
        }}
      >
        {regionLabel[region]}
      </div>
      <div
        style={{
          color: colors.text,
          fontSize: 40,
          fontWeight: 600,
          marginTop: 10,
          opacity: interpolate(frame, [12, 28], [0, 0.9], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {count} tin nổi bật
      </div>
    </AbsoluteFill>
  );
};
