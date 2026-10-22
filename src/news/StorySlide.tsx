import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BULLETIN_DATE, Story } from "./data";
import { colors, FONT_STACK, regionColor, regionLabel } from "./theme";

const PANEL_TOP = 130;
const PANEL_HEIGHT = 700;

export const StorySlide: React.FC<{
  story: Story;
  index: number;
  total: number;
}> = ({ story, index, total }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const accent = regionColor[story.region];
  const src = staticFile(story.image);

  const zoom = interpolate(frame, [0, durationInFrames], [1.0, 1.12]);
  const enter = (delay: number) =>
    spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const imageIn = enter(0);
  const headlineIn = enter(6);
  const statIn = enter(14);
  const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, fontFamily: FONT_STACK }}>
      <Img
        src={src}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(40px) brightness(0.35) saturate(1.2)",
          transform: "scale(1.2)",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 80,
          right: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: colors.muted,
          fontSize: 26,
          fontWeight: 600,
        }}
      >
        <div style={{ letterSpacing: 3, textTransform: "uppercase" }}>
          Bản tin tổng hợp · {BULLETIN_DATE}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span
            style={{
              background: accent,
              color: colors.text,
              padding: "6px 18px",
              borderRadius: 8,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {regionLabel[story.region]}
          </span>
          <span style={{ color: colors.text, fontWeight: 700 }}>
            {String(index + 1).padStart(2, "0")}
            <span style={{ color: colors.muted }}>
              {" "}
              / {String(total).padStart(2, "0")}
            </span>
          </span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 80,
          right: 80,
          height: 4,
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ width: `${progress}%`, height: "100%", background: accent }} />
      </div>

      {/* Image panel */}
      <div
        style={{
          position: "absolute",
          top: PANEL_TOP,
          left: 80,
          width: 1000,
          height: PANEL_HEIGHT,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          opacity: imageIn,
          transform: `translateX(${(1 - imageIn) * -60}px)`,
        }}
      >
        <Img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: story.imagePosition ?? "50% 50%",
            transform: `scale(${zoom})`,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: PANEL_TOP + PANEL_HEIGHT + 16,
          left: 80,
          width: 1000,
          color: colors.muted,
          fontSize: 21,
          lineHeight: 1.4,
          opacity: imageIn,
        }}
      >
        <span style={{ color: colors.text, fontWeight: 600 }}>
          {story.imageCaption}
        </span>
        <br />
        Ảnh: {story.imageCredit} · Wikimedia Commons
      </div>

      {/* Text column */}
      <div
        style={{
          position: "absolute",
          top: PANEL_TOP,
          left: 1130,
          width: 710,
          height: PANEL_HEIGHT + 70,
          display: "flex",
          flexDirection: "column",
          color: colors.text,
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            color: accent === colors.vn ? "#ff6b70" : "#6fb1ff",
            fontSize: 26,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 3,
            borderLeft: `6px solid ${accent}`,
            paddingLeft: 14,
            opacity: headlineIn,
          }}
        >
          {story.tag}
        </div>
        <div
          style={{
            fontSize: 50,
            fontWeight: 800,
            lineHeight: 1.18,
            marginTop: 18,
            opacity: headlineIn,
            transform: `translateY(${(1 - headlineIn) * 30}px)`,
          }}
        >
          {story.headline}
        </div>
        {story.stat ? (
          <div
            style={{
              marginTop: 22,
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              opacity: statIn,
              transform: `scale(${0.85 + statIn * 0.15})`,
              transformOrigin: "left center",
            }}
          >
            <span
              style={{ fontSize: 72, fontWeight: 800, color: colors.accent }}
            >
              {story.stat.value}
            </span>
            <span style={{ fontSize: 24, color: colors.muted, fontWeight: 600 }}>
              {story.stat.label}
            </span>
          </div>
        ) : null}
        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 16 }}>
          {story.bullets.map((b, i) => {
            const p = enter(24 + i * 22);
            return (
              <div
                key={b}
                style={{
                  display: "flex",
                  gap: 16,
                  fontSize: 27,
                  lineHeight: 1.4,
                  opacity: p,
                  transform: `translateX(${(1 - p) * 40}px)`,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 12,
                    height: 12,
                    marginTop: 14,
                    borderRadius: 3,
                    background: accent,
                  }}
                />
                <div>{b}</div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: "auto",
            color: colors.muted,
            fontSize: 22,
            fontStyle: "italic",
            opacity: headlineIn,
          }}
        >
          Nguồn: {story.source}
        </div>
      </div>
    </AbsoluteFill>
  );
};
