import Model, { type AsyncHasMany, attr, hasMany } from '@ember-data/model';
import type Recipe from './recipe';

export default class RestaurantModel extends Model {
  @attr() declare name: string;
  @attr() declare category: string;
  @hasMany('recipe', { async: true, inverse: 'restaurants' })
  declare recipes: AsyncHasMany<Recipe>;
}
