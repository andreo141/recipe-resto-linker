import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class IngredientsRoute extends Route {
  @service router;

  @action
  didTransition() {
    this.router.transitionTo('ingredients');
  }
}
