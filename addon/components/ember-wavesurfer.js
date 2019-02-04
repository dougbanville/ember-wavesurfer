import Component from "@ember/component";
import WaveSurfer from "wavesurfer.js";

export default Component.extend({
  url: `https://s3-eu-west-1.amazonaws.com/audiofile-uploads/english-news/190121011059.mp3`,

  didInsertElement() {
    this._super(...arguments);
    console.log(`HI from wavesurfer ${this.get("url")}`);
    var wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: "violet",
      progressColor: "purple"
    });
    wavesurfer.load(this.get("url"));
  }
});
