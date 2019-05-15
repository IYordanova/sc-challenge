/**
 * A view of a waveform.
 */
SC.Waveform = (() => {

  class Waveform {

    constructor({ sound, canvas }) {
      this.sound = sound;
      this.canvas = canvas;
      this.drawStart = 0;
      this.ctx = canvas.getContext('2d');
      this._addEventListeners();
      this.sound.onTimeUpdate(() => { this.update() });
    }

    _addEventListeners() {
      this.canvas.addEventListener('click', (e) => {
        const { offsetX, offsetY } = e;
        const { width, height } = this.canvas;
        const time =  offsetX  / width * this.sound.duration;
        this.ctx.clearRect(0, 0, width, height);
        this.sound.seek(time);
      }, false);
    }

    // Draw the canvas the first time. This is called once only, and before any
    // calls to `update()`.
    render() {
      this.update();
    }

    // Update the visual state of the waveform so that it accurately represents
    // the play progress of its sound.
    update() {
      const data = this.sound.waveformData;
      const { width, height, offsetWidth } = this.canvas;
      const currentPlayPosition = this.sound.currentTime / this.sound.duration * width;
      console.log(currentPlayPosition)
      const drawEnd = currentPlayPosition === 0 || currentPlayPosition < this.drawStart ? offsetWidth : currentPlayPosition
      this.drawStart = currentPlayPosition < this.drawStart ? 0 : this.drawStart;

      for (let x = this.drawStart; x < drawEnd; x++) {
        const sampleInd = Math.floor(x * data.width / width);
        const value = Math.floor(
           height * data.samples[sampleInd] / data.height / 2
        );
        this.ctx.fillStyle = x < currentPlayPosition ? '#f60' : '#333';
        this.ctx.fillRect(x, value, 1, height - value * 2);
      }

      this.drawStart = drawEnd;
    }
  };

  return Waveform;

})();
