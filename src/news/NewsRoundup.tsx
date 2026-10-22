import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Fragment } from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Region, stories, VOICEOVER } from "./data";
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import { SectionCard } from "./SectionCard";
import { StorySlide } from "./StorySlide";
import {
  colors,
  FPS,
  INTRO_FRAMES,
  OUTRO_FRAMES,
  SECTION_FRAMES,
  STORY_FRAMES,
  TRANSITION_FRAMES,
  VOICE_DELAY_FRAMES,
  VOICE_TAIL_FRAMES,
} from "./theme";
import { Ticker } from "./Ticker";
import voiceoverDurations from "./voiceover.json";

const regions: Region[] = ["vn", "world"];
const timing = linearTiming({ durationInFrames: TRANSITION_FRAMES });

const sceneFrames = (clip: string, minFrames: number) => {
  const seconds = (voiceoverDurations as Record<string, number>)[clip] ?? 0;
  return Math.max(
    minFrames,
    VOICE_DELAY_FRAMES + Math.ceil(seconds * FPS) + VOICE_TAIL_FRAMES,
  );
};

const introFrames = sceneFrames(VOICEOVER.intro, INTRO_FRAMES);
const outroFrames = sceneFrames(VOICEOVER.outro, OUTRO_FRAMES);
const sectionFrames = (region: Region) =>
  sceneFrames(VOICEOVER.section[region], SECTION_FRAMES);

const sceneLengths = [
  introFrames,
  ...regions.flatMap((region) => [
    sectionFrames(region),
    ...stories
      .filter((s) => s.region === region)
      .map((s) => sceneFrames(s.voiceover, STORY_FRAMES)),
  ]),
  outroFrames,
];

// Every scene after the first overlaps the previous one by one transition.
export const NEWS_DURATION =
  sceneLengths.reduce((a, b) => a + b, 0) -
  (sceneLengths.length - 1) * TRANSITION_FRAMES;

const Voice: React.FC<{ clip: string }> = ({ clip }) => (
  <Sequence from={VOICE_DELAY_FRAMES} layout="none">
    <Audio src={staticFile(`voiceover/${clip}.mp3`)} />
  </Sequence>
);

export const NewsRoundup: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={introFrames}>
          <Intro />
          <Voice clip={VOICEOVER.intro} />
        </TransitionSeries.Sequence>
        {regions.map((region) => {
          const regionStories = stories.filter((s) => s.region === region);
          return (
            <Fragment key={region}>
              <TransitionSeries.Transition presentation={fade()} timing={timing} />
              <TransitionSeries.Sequence durationInFrames={sectionFrames(region)}>
                <SectionCard region={region} count={regionStories.length} />
                <Voice clip={VOICEOVER.section[region]} />
              </TransitionSeries.Sequence>
              {regionStories.map((story, i) => (
                <Fragment key={story.headline}>
                  <TransitionSeries.Transition
                    presentation={i === 0 ? slide({ direction: "from-right" }) : fade()}
                    timing={timing}
                  />
                  <TransitionSeries.Sequence
                    durationInFrames={sceneFrames(story.voiceover, STORY_FRAMES)}
                  >
                    <StorySlide
                      story={story}
                      index={stories.indexOf(story)}
                      total={stories.length}
                    />
                    <Voice clip={story.voiceover} />
                  </TransitionSeries.Sequence>
                </Fragment>
              ))}
            </Fragment>
          );
        })}
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={outroFrames}>
          <Outro />
          <Voice clip={VOICEOVER.outro} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Ticker
        showFrom={introFrames}
        hideFrom={NEWS_DURATION - outroFrames}
        fade={TRANSITION_FRAMES}
      />
    </AbsoluteFill>
  );
};
