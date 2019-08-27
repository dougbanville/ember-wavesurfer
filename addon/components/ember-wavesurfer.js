import Component from "@ember/component";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import MinimapPlugin from "wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js";
import { inject as service } from "@ember/service";
import { htmlSafe } from "@ember/string";

export default Component.extend({
  wavesurferService: service(),

  controls: true,
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
  json: false,

  init() {
    this._super(...arguments);
    this.set(
      "wsId",
      "_" +
        Math.random()
          .toString(36)
          .substr(2, 9)
    );
    this.wavesurferService.setProperty("id", this.wsId);
  },

  didInsertElement() {
    this._super(...arguments);
    const params = {
      backend: "MediaElement",
      audioRate: this.audioRate,
      autoCenter: this.autoCenter,
      barHeight: this.barHeight,
      barGap: this.barGap,
      container: "#" + this.wsId,
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
          container: "#" + this.wsId + "wave-timeline"
        }),
        MinimapPlugin.create()
      ];
    }

    var wavesurfer = WaveSurfer.create(params);

    if (this.json) {
      fetch(this.json)
        .then(response => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then(peaks => {
          console.log("loaded peaks! sample_rate: " + peaks.sample_rate);

          // load peaks into wavesurfer.js
          wavesurfer.load(this.url, peaks.data, "auto");
        })
        .catch(e => {
          console.error("error", e);
        });
    } else {
      wavesurfer.load(this.url);
    }

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
