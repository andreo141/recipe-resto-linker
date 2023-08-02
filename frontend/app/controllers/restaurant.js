import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class RestaurantController extends Controller {
  @tracked newRestaurantName = '';
  @tracked newRestaurantCategory = '';

  @service store;

  @action
  async createRestaurant(event) {
    if (!this.newRestaurantName) {
      alert('Please enter a valid restaurant name');
      return;
    }

    if (!this.newRestaurantCategory) {
      alert('Please enter a valid restaurant category');
      return;
    }

    event.preventDefault();

    // create the new restaurant
    const restaurant = this.store.createRecord('restaurant', {
      name: this.newRestaurantName,
      category: this.newRestaurantCategory,
    });
    try {
      console.log(restaurant.name, restaurant.category);
      await restaurant.save();
    } catch (e) {
      console.error('Error creating restaurant:', e);
    }

    // clear the input fields
    this.newRestaurantName = '';
    this.newRestaurantCategory = '';
  }
  @action
  removeRestaurant(restaurant, event) {
    event.preventDefault();
    restaurant.destroyRecord();
  }
}
