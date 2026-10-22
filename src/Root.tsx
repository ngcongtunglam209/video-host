import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { NEWS_DURATION, NewsRoundup } from "./news/NewsRoundup";
import { FPS } from "./news/theme";
import { WEATHER_DURATION, WeatherForecast } from "./weather/WeatherForecast";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ title: "Hello Remotion" }}
      />
      <Composition
        id="NewsRoundup"
        component={NewsRoundup}
        durationInFrames={NEWS_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="FantasyWeather"
        component={WeatherForecast}
        durationInFrames={WEATHER_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
