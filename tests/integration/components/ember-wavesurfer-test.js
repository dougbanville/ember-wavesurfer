import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-wavesurfer', 'Integration | Component | ember wavesurfer', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ember-wavesurfer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ember-wavesurfer}}
      template block text
    {{/ember-wavesurfer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
