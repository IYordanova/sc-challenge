/**
 * A view of a waveform.
 */
SC.Waveform = (() => {

  class Waveform {

    constructor({ sound, canvas }) {
      this.sound = sound;
      this.canvas = canvas;

      this.sound.onTimeUpdate(() => { this.update() });
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
      const ctx = this.canvas.getContext('2d');

      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let x = 0; x < this.canvas.offsetWidth; x++) {

        const sampleInd = Math.floor(x * data.width / this.canvas.width);
        const value = Math.floor(
          this.canvas.height * data.samples[sampleInd] / data.height / 2
        );
        const width = this.canvas.width;
        const height = this.canvas.height;

        for (let y = value; y < height - value; y++) {
          ctx.fillStyle =
            x < this.sound.currentTime / this.sound.duration * width
              ? '#f60'
              : '#333';

          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  };

  return Waveform;

})();
