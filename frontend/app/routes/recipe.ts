import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Store from '@ember-data/store';
import Recipe from 'frontend/models/recipe';

export default class RestaurantRoute extends Route {
  @service store!: Store;

  async model(): Promise<Recipe[]> {
    const recipes = await this.store.findAll('recipe');
    return recipes.toArray() as Recipe[];
  }
}
