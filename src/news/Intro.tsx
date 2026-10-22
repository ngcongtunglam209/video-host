import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BULLETIN_DATE, INTRO_IMAGE } from "./data";
import { colors, FONT_STACK } from "./theme";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1.15, 1.0]);
  const bar = spring({ frame, fps, config: { damping: 200 } });
  const title = spring({ frame: frame - 8, fps, config: { damping: 200 } });
  const sub = spring({ frame: frame - 20, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, fontFamily: FONT_STACK }}>
      <Img
        src={staticFile(INTRO_IMAGE.image)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(11,18,32,0.95) 0%, rgba(11,18,32,0.6) 55%, rgba(11,18,32,0.2) 100%)",
        }}
      />
      <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 140 }}>
        <div
          style={{
            width: 220 * bar,
            height: 12,
            background: `linear-gradient(90deg, ${colors.vn}, ${colors.world})`,
            marginBottom: 36,
          }}
        />
        <div
          style={{
            color: colors.accent,
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: title,
          }}
        >
          Bản tin tổng hợp
        </div>
        <div
          style={{
            color: colors.text,
            fontSize: 130,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 12,
            opacity: title,
            transform: `translateY(${(1 - title) * 40}px)`,
          }}
        >
          Việt Nam
          <br />& Thế giới
        </div>
        <div
          style={{
            color: colors.muted,
            fontSize: 44,
            fontWeight: 600,
            marginTop: 32,
            opacity: sub,
            transform: `translateY(${(1 - sub) * 30}px)`,
          }}
        >
          {BULLETIN_DATE}
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          right: 40,
          bottom: 30,
          color: colors.muted,
          fontSize: 20,
          opacity: 0.8,
        }}
      >
        Ảnh: {INTRO_IMAGE.credit}
      </div>
    </AbsoluteFill>
  );
};
