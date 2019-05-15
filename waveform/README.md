## The Dodgy Waveform

In this challenge, there is a pre-existing project which needs some love.

The application is a very simple "player" interface which renders waveforms onto a canvas. By using the play buttons, you can simulate playing a sound which then triggers the waveform to update and display the play progress. The issue is that the algorithm used is very naive, and the code inefficient.

**The task here is to refactor the `waveform.js` file such that the performance is maximized.**

> Though the other code around this is also not of a high quality, it should be left as is, since it simply simulates a program flow and triggers the necessary events. Please do not worry that we normally write code like this at SoundCloud.

The ultimate goal here is for smooth updating of the canvas during playback while performing minimal amount of processing.

### Bonus challenge

After getting the updating to be silky smooth, as an added bonus, you may implement seeking on the waveform using the `sound.seek(time)` method.

### Notes

- In addition to fixing our terrible waveform, please include notes (simple bullet points would be fine) highlighting what issues you discovered, and the steps or browser tools you used to identify them.
- We expect this should take roughly one hour.

### Notes on the solution:

- One of the obvious problems with the code was the fact that the whole canvas was redrawn on each update
- Another issue was the way it was drawn - each Rectangle representing unit of time in the wave was drawn essentially pixel by pixel instead of all at once
- Small wins are also moving a few statements and computations out of the loop as they don't depend on the changing index
