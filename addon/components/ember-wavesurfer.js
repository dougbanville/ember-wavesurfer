import Component from "@ember/component";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import MinimapPlugin from "wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js";
import { inject as service } from "@ember/service";
import { htmlSafe } from "@ember/string";

export default Component.extend({
  wavesurferService: service(),

  isReady: false,
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
  responsive: true,
  scrollParent: true,
  skipLength: 2,
  splitChannels: false,
  xhr: null,
  showTimeLine: true,

  didInsertElement() {
    this._super(...arguments);
    const params = {
      audioRate: this.audioRate,
      autoCenter: this.autoCenter,
      barHeight: this.barHeight,
      barGap: this.barGap,
      container: "#waveform",
      waveColor: this.waveColor,
      progressColor: this.progressColor,
      barWidth: this.barWidth,
      cursorColor: this.cursorColor,
      cursorWidth: this.cursorWidth,
      fillParent: this.fillParent,
      forceDecode: this.forceDecode,
      height: this.height,
      hideScrollbar: this.hideScrollbar,
      interact: this.interact,
      loopSelection: this.loopSelection,
      maxCanvasWidth: this.maxCanvasWidth,
      MultiCanvas: this.MultiCanvas,
      responsive: this.responsive,
      scrollParent: this.scrollParent,
      skipLength: this.skipLength,
      splitChannels: this.splitChannels,
      xhr: this.xhr
    };
    if (this.showTimeLine) {
      params.plugins = [
        TimelinePlugin.create({
          container: "#wave-timeline"
        }),
        MinimapPlugin.create()
      ];
    }

    var wavesurfer = WaveSurfer.create(params);
    wavesurfer.load(this.url);
    wavesurfer.on("error", e => {
      this.set("error", e);
    });
    this.set("wavesurfer", wavesurfer);
    this.wavesurferService.setWaveSurfer(wavesurfer);

    wavesurfer.on("audioprocess", () => {
      //this.wavesurferService.setTime(wavesurfer.getCurrentTime());
      this.wavesurferService.setProperty("currentTime", wavesurfer.getCurrentTime());
    });

    wavesurfer.on("ready", () => {
      this.wavesurferService.setProperty("duration", wavesurfer.getDuration());
    });

    wavesurfer.on("play", () => {
      this.wavesurferService.playerStatus("playing");
    });
    wavesurfer.on("pause", () => {
      this.wavesurferService.playerStatus("paused");
    });
    wavesurfer.on("stop", () => {
      this.wavesurferService.playerStatus("stopped");
    });

    wavesurfer.on("loading", percents => {
      this.set("percentage", htmlSafe(`${percents}%`));
      if (percents > 99) {
        this.set("percentage", "Creating Waveform");
      }
    });

    wavesurfer.on("ready", () => {
      this.set("isReady", true);
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
