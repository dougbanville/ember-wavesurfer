import Component from "@ember/component";
import WaveSurfer from "wavesurfer.js";
import { inject as service } from "@ember/service";

export default Component.extend({
  wavesurferStatus: service(),

  url: `https://s3-eu-west-1.amazonaws.com/audiofile-uploads/english-news/190121011059.mp3`,

  audioRate: 1,
  autoCenter: true,
  waveColor: "violet",
  progressColor: "purple",
  barWidth: null,
  cursorColor: "#333",
  cursorWidth: 1,
  fillParent: true,
  forceDecode: false,
  height: 128,
  hideScrollbar: false,
  interact: true,
  isPlaying: false,
  loopSelection: true,
  maxCanvasWidth: 4000,
  renderer: "MultiCanvas",
  responsive: false,
  scrollParent: false,
  skipLength: 2,
  splitChannels: false,
  xhr: null,

  didInsertElement() {
    this._super(...arguments);
    var wavesurfer = WaveSurfer.create({
      audioRate: this.get("audioRate"),
      autoCenter: this.get("autoCenter"),
      container: "#waveform",
      waveColor: this.get("waveColor"),
      progressColor: this.get("progressColor"),
      barWidth: this.get("barWidth"),
      cursorColor: this.get("cursorColor"),
      cursorWidth: this.get("cursorWidth"),
      fillParent: this.get("fillParent"),
      forceDecode: this.get("forceDecode"),
      height: this.get("height"),
      hideScrollbar: this.get("hideScrollbar"),
      interact: this.get("interact"),
      loopSelection: this.get("loopSelection"),
      maxCanvasWidth: this.get("maxCanvasWidth"),
      MultiCanvas: this.get("MultiCanvas"),
      responsive: this.get("responsive"),
      scrollParent: this.get("scrollParent"),
      skipLength: this.get("skipLength"),
      splitChannels: this.get("splitChannels"),
      xhr: this.get("xhr")
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

  willDestroyElement() {
    this.get("wavesurfer").stop();
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
