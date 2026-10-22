// Writes src/news/voiceover.json with the duration (seconds) of every clip in
// public/voiceover, so scene lengths can follow the narration.
import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";

const dir = "public/voiceover";
const durations = {};
for (const file of readdirSync(dir).filter((f) => f.endsWith(".mp3")).sort()) {
  const out = execFileSync("npx", [
    "remotion", "ffprobe", "-v", "error",
    "-show_entries", "format=duration", "-of", "csv=p=0", `${dir}/${file}`,
  ]).toString();
  durations[file.replace(/\.mp3$/, "")] = Number(Number(out.trim()).toFixed(3));
}
writeFileSync("src/news/voiceover.json", JSON.stringify(durations, null, 2) + "\n");
console.log(durations);
