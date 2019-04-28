import Service from "@ember/service";

export default Service.extend({
  isPlaying: false,

  currentTime: 0,

  setWaveSurfer(wavesurfer) {
    this.set("wavesurfer", wavesurfer);
  },
  setTime(time) {
    this.set("currentTime", time);
  },
  playerStatus(status) {
    if (status === "playing") {
      this.set("isPlaying", true);
    } else {
      this.set("isPlaying", false);
    }
    if (status === "paused" || status === "stopped") {
      this.set("isPlaying", false);
    }
  }
});
