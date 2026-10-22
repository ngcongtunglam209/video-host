// Everything in this bulletin is fictional: the kingdom, places, weather and
// numbers are made up for entertainment.

export type Effect = "candy" | "storm" | "fog" | "meteor" | "sand" | "snowUp";

export type IconKind =
  | Effect
  | "rainbow"
  | "cookie"
  | "honeySun";

export type City = {
  name: string;
  condition: string;
  effect: Effect;
  temp: number;
  low: number;
  stats: { label: string; value: string }[];
  advice: string;
  // Map position in the 1600×900 map viewBox.
  map: { x: number; y: number };
  // Sky gradient, top to bottom.
  sky: [string, string];
  // Ground silhouette colors, back to front.
  ground: [string, string];
  accent: string;
  // Clip name in public/weather/voiceover (without .mp3).
  voiceover: string;
};

export const KINGDOM = "Vương quốc Vân Du";
export const STATION = "Đài Khí tượng Mây Ngàn";
export const FORECAST_DATE = "Thứ Năm, ngày 23 tháng Mây Bay";

export const cities: City[] = [
  {
    name: "Đảo Kẹo Bông",
    condition: "Mưa kẹo dẻo rải rác",
    effect: "candy",
    temp: 24,
    low: 20,
    stats: [
      { label: "Lượng kẹo", value: "30 viên/m²" },
      { label: "Độ ngọt", value: "Rất cao" },
      { label: "Bắt đầu", value: "Từ chiều" },
    ],
    advice: "Mang ô thật dày. Không ăn kẹo rơi từ độ cao trên 3 m.",
    map: { x: 1310, y: 730 },
    sky: ["#ffb3d9", "#ffe3b8"],
    ground: ["#ff8fc6", "#c86bd9"],
    accent: "#ff5fa8",
    voiceover: "02-candy",
  },
  {
    name: "Đỉnh Sấm Rền",
    condition: "Giông kèm rồng bay thấp",
    effect: "storm",
    temp: 15,
    low: 9,
    stats: [
      { label: "Gió giật", value: "Cấp 9" },
      { label: "Sấm sét", value: "Dày đặc" },
      { label: "Rồng", value: "Bay thấp" },
    ],
    advice: "Các hiệp sĩ có lịch săn rồng nên hoãn chuyến đi.",
    map: { x: 430, y: 300 },
    sky: ["#1b1f3a", "#4a4f6e"],
    ground: ["#2a2d45", "#14162a"],
    accent: "#ffd84a",
    voiceover: "03-thunder",
  },
  {
    name: "Thung Lũng Sương Tím",
    condition: "Sương mù oải hương",
    effect: "fog",
    temp: 19,
    low: 14,
    stats: [
      { label: "Tầm nhìn", value: "< 50 m" },
      { label: "Hương", value: "Oải hương" },
      { label: "Buồn ngủ", value: "Nhẹ" },
    ],
    advice: "Phù thủy không nên cưỡi chổi vào buổi sáng.",
    map: { x: 780, y: 440 },
    sky: ["#8e6fd1", "#e2c9f5"],
    ground: ["#7a5bb8", "#5a3f96"],
    accent: "#c79bff",
    voiceover: "04-fog",
  },
  {
    name: "Hồ Gương Bạc",
    condition: "Mưa sao băng về đêm",
    effect: "meteor",
    temp: 18,
    low: 12,
    stats: [
      { label: "Cường độ", value: "120 sao/giờ" },
      { label: "Bầu trời", value: "Quang" },
      { label: "Điều ước", value: "Tối đa 3" },
    ],
    advice: "Thích hợp để ước. Mỗi người tối đa ba điều.",
    map: { x: 1120, y: 360 },
    sky: ["#060a24", "#1d2a5c"],
    ground: ["#101838", "#0a0f26"],
    accent: "#9fd8ff",
    voiceover: "05-meteor",
  },
  {
    name: "Sa Mạc Cát Hát",
    condition: "Nắng gắt, bão cát biết hát",
    effect: "sand",
    temp: 41,
    low: 27,
    stats: [
      { label: "Nhiệt độ", value: "41°C" },
      { label: "Thể loại", value: "Cải lương" },
      { label: "Độ ồn", value: "90 dB" },
    ],
    advice: "Mang theo nút tai và thật nhiều nước.",
    map: { x: 470, y: 640 },
    sky: ["#ff9a3c", "#ffe08a"],
    ground: ["#e8a04f", "#c97a30"],
    accent: "#ff6a1f",
    voiceover: "06-desert",
  },
  {
    name: "Băng Nguyên Tuyết Ngọc",
    condition: "Tuyết rơi ngược lên trời",
    effect: "snowUp",
    temp: -5,
    low: -12,
    stats: [
      { label: "Thấp nhất", value: "−12°C" },
      { label: "Hướng tuyết", value: "Đi lên" },
      { label: "Kéo dài", value: "2 ngày" },
    ],
    advice: "Chim cánh cụt nên bám chặt mặt đất.",
    map: { x: 820, y: 210 },
    sky: ["#2b6aa8", "#bfe6ff"],
    ground: ["#e6f4ff", "#a9d2f0"],
    accent: "#7fd3ff",
    voiceover: "07-snow",
  },
];

export const outlook: {
  day: string;
  icon: IconKind;
  condition: string;
  high: number;
  low: number;
}[] = [
  { day: "Ngày mai", icon: "rainbow", condition: "Cầu vồng đôi", high: 26, low: 19 },
  { day: "Ngày kia", icon: "cookie", condition: "Mưa bánh quy giòn ven biển", high: 23, low: 17 },
  { day: "Thứ Bảy", icon: "honeySun", condition: "Nắng mật ong", high: 29, low: 21 },
];

export const WARNING = {
  level: "Cảnh báo cấp Cầu Vồng",
  text: "Thủy triều sô-cô-la dâng cao ở biển Đường Phèn. Tàu kẹo cần neo đậu an toàn.",
};

export const VOICEOVER = {
  intro: "00-intro",
  overview: "01-overview",
  outlook: "08-outlook",
  outro: "09-outro",
} as const;
