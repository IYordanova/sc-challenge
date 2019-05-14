(function main() {

  const longWaveformCanvas = document.getElementById('waveform-long');
  const longSoundPlayButton = document.getElementById('play-button-long');
  const shortWaveformCanvas = document.getElementById('waveform-short');
  const shortSoundPlayButton = document.getElementById('play-button-short');

  const longSound = new SC.Sound(SC.longSound);
  const shortSound = new SC.Sound(SC.shortSound);

  const longWaveform = new SC.Waveform({
    canvas: longWaveformCanvas,
    sound: longSound
  });

  const shortWaveform = new SC.Waveform({
    canvas: shortWaveformCanvas,
    sound: shortSound
  });

  longWaveform.render();
  shortWaveform.render();

  longSoundPlayButton.addEventListener('click', () => {
    longSound.toggle();
    longSoundPlayButton.classList.toggle('sc-button-play');
    longSoundPlayButton.classList.toggle('sc-button-pause');
  });

  shortSoundPlayButton.addEventListener('click', () => {
    shortSound.toggle();
    shortSoundPlayButton.classList.toggle('sc-button-play');
    shortSoundPlayButton.classList.toggle('sc-button-pause');
  });

})();
