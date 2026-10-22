import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { STATION } from "./data";
import { RainbowArc, rainbowText } from "./Intro";
import { Sparkles } from "./effects";
import { colors, FONT_STACK } from "./theme";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const details = spring({ frame: frame - 15, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_STACK,
        background: "linear-gradient(#141a46 0%, #3a2f7a 60%, #c46aa6 100%)",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: colors.text,
        overflow: "hidden",
      }}
    >
      <Sparkles count={160} color="#ffffff" maxY={1080} />
      <RainbowArc progress={enter} cx={960} cy={1500} radius={700} />
      <div
        style={{
          ...rainbowText,
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: 8,
          textTransform: "uppercase",
          opacity: enter,
        }}
      >
        {STATION}
      </div>
      <div
        style={{
          fontSize: 92,
          fontWeight: 800,
          marginTop: 20,
          opacity: enter,
          transform: `translateY(${(1 - enter) * 30}px)`,
        }}
      >
        Chúc quý vị một ngày
        <br />
        thật kỳ diệu!
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
          Đây là bản tin <span style={{ color: colors.text, fontWeight: 700 }}>giả tưởng</span>: mọi địa danh,
          hiện tượng và số liệu đều là hư cấu.
        </div>
        <div>
          <span style={{ color: colors.text, fontWeight: 700 }}>Giọng đọc: </span>
          AI tạo bởi ElevenLabs.
        </div>
      </div>
    </AbsoluteFill>
  );
};
