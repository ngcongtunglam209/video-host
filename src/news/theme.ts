import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FONT = "Be Vietnam Pro";
// DejaVu covers scripts Be Vietnam Pro lacks, e.g. Cyrillic photo credits.
export const FONT_STACK = `"${FONT}", "DejaVu Sans", sans-serif`;

for (const [file, weight] of [
  ["BeVietnamPro-Regular.ttf", "400"],
  ["BeVietnamPro-SemiBold.ttf", "600"],
  ["BeVietnamPro-Bold.ttf", "700"],
  ["BeVietnamPro-ExtraBold.ttf", "800"],
] as const) {
  loadFont({ family: FONT, url: staticFile(`fonts/${file}`), weight });
}

export const colors = {
  bg: "#0b1220",
  panel: "rgba(11, 18, 32, 0.78)",
  text: "#f5f7fb",
  muted: "#a9b4c7",
  vn: "#e0242b",
  world: "#1f7ae0",
  accent: "#ffc531",
};

export const regionLabel = { vn: "Trong nước", world: "Quốc tế" } as const;
export const regionColor = { vn: colors.vn, world: colors.world } as const;

export const FPS = 30;
// Minimum scene lengths; scenes grow to fit their voiceover clip.
export const INTRO_FRAMES = 150;
export const SECTION_FRAMES = 75;
export const STORY_FRAMES = 240;
export const OUTRO_FRAMES = 180;
export const TRANSITION_FRAMES = 15;
// Narration starts once the incoming transition has finished, and the scene
// holds briefly after it ends.
export const VOICE_DELAY_FRAMES = TRANSITION_FRAMES + 6;
export const VOICE_TAIL_FRAMES = 20;
