import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class RestaurantController extends Controller {
  @tracked newRestaurantName = '';
  @tracked newMenuItem = '';

  @service store;

  @action
  createRestaurant(event) {
    if (!this.newRestaurantName || typeof this.newRestaurantName !== 'string') {
      alert('Please enter a valid restaurant name');
      return;
    }

    if (!this.newMenuItem || typeof this.newMenuItem !== 'string') {
      alert('Please enter a valid menu item');
      return;
    }
    console.log(this.newRestaurantName, this.newMenuItem);

    event.preventDefault();

    // create the new book
    const restaurant = this.store.createRecord('restaurant', {
      name: this.newRestaurantName,
      item: this.newMenuItem,
    });

    restaurant.save();

    // clear the input fields
    this.newRestaurantName = '';
    this.newMenuItem = '';
  }
  @action
  removeRestaurant(restaurant, event) {
    event.preventDefault();
    restaurant.destroyRecord();
  }
}
