import Component from "@ember/component";
import WaveSurfer from "wavesurfer.js";
import { inject as service } from "@ember/service";

export default Component.extend({
  wavesurferStatus: service(),

  url: `https://s3-eu-west-1.amazonaws.com/audiofile-uploads/english-news/190121011059.mp3`,

  waveColor: "violet",
  progressColor: "purple",

  isPlaying: false,

  didInsertElement() {
    this._super(...arguments);
    console.log(`HI from wavesurfer ${this.get("url")}`);
    var wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: this.get("waveColor"),
      progressColor: this.get("progressColor")
    });
    wavesurfer.load(this.get("url"));
    this.set("wavesurfer", wavesurfer);

    wavesurfer.on("play", () => {
      this.get("wavesurferStatus").playerStatus("playing");
    });
    wavesurfer.on("pause", () => {
      this.get("wavesurferStatus").playerStatus("paused");
    });
    wavesurfer.on("stop", () => {
      this.get("wavesurferStatus").playerStatus("stopped");
    });
  },

  actions: {
    togglePlayer() {
      this.get("wavesurfer").playPause();
    },
    stopPlayer() {
      this.get("wavesurfer").stop();
    }
  }
});
