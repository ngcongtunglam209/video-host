// Writes a JSON file with the duration (seconds) of every clip in a voiceover
// folder, so scene lengths can follow the narration.
// Usage: node scripts/voiceover-durations.mjs [clip-dir] [out-json]
// Defaults to the news bulletin (public/voiceover -> src/news/voiceover.json).
import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";

const [dir = "public/voiceover", outFile = "src/news/voiceover.json"] = process.argv.slice(2);
const durations = {};
for (const file of readdirSync(dir).filter((f) => f.endsWith(".mp3")).sort()) {
  const out = execFileSync("npx", [
    "remotion", "ffprobe", "-v", "error",
    "-show_entries", "format=duration", "-of", "csv=p=0", `${dir}/${file}`,
  ]).toString();
  durations[file.replace(/\.mp3$/, "")] = Number(Number(out.trim()).toFixed(3));
}
writeFileSync(outFile, JSON.stringify(durations, null, 2) + "\n");
console.log(durations);
