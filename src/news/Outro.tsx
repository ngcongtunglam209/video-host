import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { stories } from "./data";
import { colors, FONT_STACK } from "./theme";

const sources = [
  ...new Set(stories.flatMap((s) => s.source.split(", "))),
];

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const details = spring({ frame: frame - 15, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        fontFamily: FONT_STACK,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: colors.text,
      }}
    >
      <div
        style={{
          width: 220,
          height: 10,
          background: `linear-gradient(90deg, ${colors.vn}, ${colors.world})`,
          marginBottom: 40,
          transform: `scaleX(${enter})`,
        }}
      />
      <div
        style={{
          fontSize: 90,
          fontWeight: 800,
          opacity: enter,
          transform: `translateY(${(1 - enter) * 30}px)`,
        }}
      >
        Cảm ơn quý vị đã theo dõi
      </div>
      <div
        style={{
          marginTop: 50,
          fontSize: 30,
          color: colors.muted,
          lineHeight: 1.6,
          maxWidth: 1400,
          opacity: details,
        }}
      >
        <div>
          <span style={{ color: colors.text, fontWeight: 700 }}>Nguồn tin: </span>
          {sources.join(" · ")}
        </div>
        <div>
          <span style={{ color: colors.text, fontWeight: 700 }}>Hình ảnh: </span>
          Wikimedia Commons (CC BY, CC BY-SA, Public domain). Ảnh tư liệu và minh
          họa, không chụp tại sự kiện.
        </div>
        <div>
          <span style={{ color: colors.text, fontWeight: 700 }}>Giọng đọc: </span>
          AI tạo bởi ElevenLabs.
        </div>
      </div>
    </AbsoluteFill>
  );
};
