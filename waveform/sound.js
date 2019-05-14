/**
 * This is a model which pretends to play a sound. In reality, it merely emits
 * `timeUpdate` events while "playing". It additionally provides a `seek` method
 * to skip within the sound.
 *
 * These events can be listened to by using `sound.onTimeUpdate({{handler}})`.
 *
 * Though the code below is not pretty, __it should not be necessary to modify
 * its contents__.
 */

SC.Sound = (() => {

  class Sound {
    constructor({ duration, waveformData }) {
      // Public properties
      this.duration = duration || 0;
      this.waveformData = waveformData || {};
      this.currentTime = 0;

      // Private properties
      this._isPlaying = false;
      this._timer = null;
      this._timeUpdateListeners = [];
    }

    /**
     * Sets the current time of the sound.
     * A 'timeUpdate' event will be emitted after seeking.
     *
     * @param {Number} time  A timestamp to seek to (in milliseconds)
     */
    seek(time) {
      const wasPlaying = this._isPlaying;

      if (wasPlaying) {
        this.toggle();
      }

      this.currentTime = time;

      if (wasPlaying) {
        this.toggle();
      }
      this._triggerTimeUpdate();
    }

    /**
     * Toggle this Sound between play and pause state.
     *
     * Since this is merely a dummy model, it doesn't handle any special cases
     * (eg: reaching the end of the track).
     * Again, this is okay for the purposes of this challenge.
     */
    toggle() {
      if (this._isPlaying) {
        this._isPlaying = false;
        clearInterval(this._timer);
        return;
      }
      this._isPlaying = true;
      const playStartTime = this.currentTime;
      const startTime = Date.now();
      this._timer = setInterval(() => {
        this.currentTime = playStartTime + Date.now() - startTime;
        this._triggerTimeUpdate();
        if (this.currentTime >= this.duration) {
          this.toggle();
        }
      }, 10);
    }

    /**
     * Registers a funciton that will be called any time the current time value
     * of the sound changes
     * @param  {Function} listenerFn Called when the current time changes.
     */
    onTimeUpdate(listenerFn) {
      this._timeUpdateListeners.push(listenerFn);
    }

    _triggerTimeUpdate() {
      this._timeUpdateListeners.forEach((fn) => { fn(); })
    }
  };

  return Sound;

})();
