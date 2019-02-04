import Service from "@ember/service";

export default Service.extend({
  isPlaying: false,

  playerStatus(status) {
    console.log(`set ${status} to true`);
    if (status === "playing") {
      this.set("isPlaying", true);
    } else {
      this.set("isPlaying", false);
    }
  }
});
