import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Fragment } from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { CityScene } from "./CityScene";
import { cities, STATION, VOICEOVER } from "./data";
import { Intro } from "./Intro";
import { MapScene } from "./MapScene";
import { Outlook } from "./Outlook";
import { Outro } from "./Outro";
import {
  CITY_FRAMES,
  colors,
  FONT_STACK,
  FPS,
  INTRO_FRAMES,
  MAP_FRAMES,
  OUTLOOK_FRAMES,
  OUTRO_FRAMES,
  TRANSITION_FRAMES,
  VOICE_DELAY_FRAMES,
  VOICE_TAIL_FRAMES,
} from "./theme";
import voiceoverDurations from "./voiceover.json";

const timing = linearTiming({ durationInFrames: TRANSITION_FRAMES });

const sceneFrames = (clip: string, minFrames: number) => {
  const seconds = (voiceoverDurations as Record<string, number>)[clip] ?? 0;
  return Math.max(minFrames, VOICE_DELAY_FRAMES + Math.ceil(seconds * FPS) + VOICE_TAIL_FRAMES);
};

const introFrames = sceneFrames(VOICEOVER.intro, INTRO_FRAMES);
const mapFrames = sceneFrames(VOICEOVER.overview, MAP_FRAMES);
const cityFrames = cities.map((c) => sceneFrames(c.voiceover, CITY_FRAMES));
const outlookFrames = sceneFrames(VOICEOVER.outlook, OUTLOOK_FRAMES);
const outroFrames = sceneFrames(VOICEOVER.outro, OUTRO_FRAMES);

const sceneLengths = [introFrames, mapFrames, ...cityFrames, outlookFrames, outroFrames];

// Every scene after the first overlaps the previous one by one transition.
export const WEATHER_DURATION =
  sceneLengths.reduce((a, b) => a + b, 0) - (sceneLengths.length - 1) * TRANSITION_FRAMES;

const Voice: React.FC<{ clip: string }> = ({ clip }) => (
  <Sequence from={VOICE_DELAY_FRAMES} layout="none">
    <Audio src={staticFile(`weather/voiceover/${clip}.mp3`)} />
  </Sequence>
);

// Station logo and a "fictional" badge, shown between the intro and outro.
const StationBug: React.FC<{ showFrom: number; hideFrom: number }> = ({ showFrom, hideFrom }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [showFrom - TRANSITION_FRAMES, showFrom, hideFrom, hideFrom + TRANSITION_FRAMES],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  if (opacity === 0) {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        right: 60,
        top: 48,
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily: FONT_STACK,
        opacity,
      }}
    >
      <span
        style={{
          padding: "8px 18px",
          borderRadius: 12,
          background: "rgba(10, 16, 40, 0.75)",
          color: colors.text,
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        {STATION}
      </span>
      <span
        style={{
          padding: "8px 18px",
          borderRadius: 12,
          background: colors.accent,
          color: "#10142a",
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        Giả tưởng
      </span>
    </div>
  );
};

export const WeatherForecast: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={introFrames}>
          <Intro />
          <Voice clip={VOICEOVER.intro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={mapFrames}>
          <MapScene />
          <Voice clip={VOICEOVER.overview} />
        </TransitionSeries.Sequence>
        {cities.map((city, i) => (
          <Fragment key={city.name}>
            <TransitionSeries.Transition
              presentation={i === 0 ? fade() : slide({ direction: "from-right" })}
              timing={timing}
            />
            <TransitionSeries.Sequence durationInFrames={cityFrames[i]}>
              <CityScene city={city} index={i} total={cities.length} />
              <Voice clip={city.voiceover} />
            </TransitionSeries.Sequence>
          </Fragment>
        ))}
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={outlookFrames}>
          <Outlook />
          <Voice clip={VOICEOVER.outlook} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={outroFrames}>
          <Outro />
          <Voice clip={VOICEOVER.outro} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <StationBug showFrom={introFrames} hideFrom={WEATHER_DURATION - outroFrames} />
    </AbsoluteFill>
  );
};
