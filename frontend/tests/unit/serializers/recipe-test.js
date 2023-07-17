import { module, test } from 'qunit';

import { setupTest } from 'frontend/tests/helpers';

module('Unit | Serializer | recipe', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('recipe');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('recipe', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
