export { FONT_STACK } from "../news/theme";

export const colors = {
  bg: "#0d1530",
  panel: "rgba(10, 16, 40, 0.62)",
  panelBorder: "rgba(255, 255, 255, 0.18)",
  text: "#ffffff",
  muted: "#c9d3ea",
  accent: "#ffd23f",
  warning: "#ff4f6d",
};

export const RAINBOW = [
  "#ff5a5f",
  "#ff9f43",
  "#ffd23f",
  "#3ddc84",
  "#3fa7ff",
  "#8a6bff",
];

export const FPS = 30;
// Minimum scene lengths; scenes grow to fit their voiceover clip.
export const INTRO_FRAMES = 150;
export const MAP_FRAMES = 240;
export const CITY_FRAMES = 210;
export const OUTLOOK_FRAMES = 240;
export const OUTRO_FRAMES = 150;
export const TRANSITION_FRAMES = 15;
export const VOICE_DELAY_FRAMES = TRANSITION_FRAMES + 6;
export const VOICE_TAIL_FRAMES = 20;
