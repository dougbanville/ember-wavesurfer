import Component from "@ember/component";
import WaveSurfer from "wavesurfer.js";
import { inject as service } from "@ember/service";

export default Component.extend({
  wavesurferStatus: service(),

  url: null,
  audioRate: 1,
  autoCenter: true,
  backend: "WebAudio",
  barGap: null,
  barHeight: 1,
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
      barHeight: this.get("barHeight"),
      barGap: this.get("barGap"),
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
    wavesurfer.on("error", e => {
      this.set("error", e);
    });
    this.set("wavesurfer", wavesurfer);
    this.wavesurferStatus.setWaveSurfer(wavesurfer);

    wavesurfer.on("audioprocess", () => {
      this.wavesurferStatus.setTime(wavesurfer.getCurrentTime());
    });

    wavesurfer.on("play", () => {
      this.wavesurferStatus.playerStatus("playing");
    });
    wavesurfer.on("pause", () => {
      this.wavesurferStatus.playerStatus("paused");
    });
    wavesurfer.on("stop", () => {
      this.get("wavesurferStatus").playerStatus("stopped");
    });
  },

  willDestroyElement() {
    this.wavesurfer.stop();
  },

  actions: {
    togglePlayer() {
      this.wavesurfer.playPause();
    },
    stopPlayer() {
      this.wavesurfer.stop();
    }
  }
});
