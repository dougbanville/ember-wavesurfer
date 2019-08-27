// BEGIN-SNIPPET docs-demo-multiple.js
import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  wavesurferService: service(),

  actions: {
    playPause() {
      this.wavesurferService.wavesurfer.playPause();
    }
  }
});
// END-SNIPPET
