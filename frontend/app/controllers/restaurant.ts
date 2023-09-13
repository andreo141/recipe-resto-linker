import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';
import Restaurant from 'frontend/models/restaurant';

export default class RestaurantController extends Controller {
  @tracked newRestaurantName: string = '';
  @tracked newRestaurantCategory: string = '';
  @service store!: Store;

  @action
  async createRestaurant(event: Event): Promise<void> {
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
    }) as Restaurant;
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
  async removeRestaurant(restaurant: Restaurant, event: Event): Promise<void> {
    event.preventDefault();
    await restaurant.destroyRecord();
  }
}
