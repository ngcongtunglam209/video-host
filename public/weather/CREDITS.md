# Credits

The fantasy weather forecast (`FantasyWeather` composition) is fiction: the
kingdom, places, weather phenomena and numbers are all made up.

All graphics are drawn in code (SVG/CSS in `src/weather/`); no photos are used.

The voiceover in `voiceover/` is AI-generated with ElevenLabs (`eleven_v4`,
voice "Chi"). After replacing a clip, run
`node scripts/voiceover-durations.mjs public/weather/voiceover src/weather/voiceover.json`
so scene lengths follow the new audio. Font: Be Vietnam Pro (SIL Open Font
License, see `../fonts/OFL.txt`).
