import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Fragment } from "react";
import { AbsoluteFill } from "remotion";
import { Region, stories } from "./data";
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import { SectionCard } from "./SectionCard";
import { StorySlide } from "./StorySlide";
import {
  colors,
  INTRO_FRAMES,
  OUTRO_FRAMES,
  SECTION_FRAMES,
  STORY_FRAMES,
  TRANSITION_FRAMES,
} from "./theme";
import { Ticker } from "./Ticker";

const regions: Region[] = ["vn", "world"];
const timing = linearTiming({ durationInFrames: TRANSITION_FRAMES });

// Every scene after the first overlaps the previous one by one transition.
const sceneCount = 2 + regions.length + stories.length;
export const NEWS_DURATION =
  INTRO_FRAMES +
  OUTRO_FRAMES +
  regions.length * SECTION_FRAMES +
  stories.length * STORY_FRAMES -
  (sceneCount - 1) * TRANSITION_FRAMES;

export const NewsRoundup: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={INTRO_FRAMES}>
          <Intro />
        </TransitionSeries.Sequence>
        {regions.map((region) => {
          const regionStories = stories.filter((s) => s.region === region);
          return (
            <Fragment key={region}>
              <TransitionSeries.Transition presentation={fade()} timing={timing} />
              <TransitionSeries.Sequence durationInFrames={SECTION_FRAMES}>
                <SectionCard region={region} count={regionStories.length} />
              </TransitionSeries.Sequence>
              {regionStories.map((story, i) => (
                <Fragment key={story.headline}>
                  <TransitionSeries.Transition
                    presentation={i === 0 ? slide({ direction: "from-right" }) : fade()}
                    timing={timing}
                  />
                  <TransitionSeries.Sequence durationInFrames={STORY_FRAMES}>
                    <StorySlide
                      story={story}
                      index={stories.indexOf(story)}
                      total={stories.length}
                    />
                  </TransitionSeries.Sequence>
                </Fragment>
              ))}
            </Fragment>
          );
        })}
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={OUTRO_FRAMES}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Ticker
        showFrom={INTRO_FRAMES}
        hideFrom={NEWS_DURATION - OUTRO_FRAMES}
        fade={TRANSITION_FRAMES}
      />
    </AbsoluteFill>
  );
};
