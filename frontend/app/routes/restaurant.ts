import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Store from '@ember-data/store';
import Restaurant from 'frontend/models/restaurant';

export default class RestaurantRoute extends Route {
  @service store!: Store;

  async model(): Promise<Restaurant[]> {
    const restaurants = await this.store.findAll('restaurant');
    return restaurants.toArray() as Restaurant[];
  }
}
