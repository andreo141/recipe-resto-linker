import Model, { type AsyncHasMany, attr, hasMany } from '@ember-data/model';
import Restaurant from './restaurant';

export default class RecipeModel extends Model {
  @attr() declare name: string;
  @attr() declare category: string;
  @hasMany('restaurant', { async: true, inverse: 'recipes' })
  declare restaurants: AsyncHasMany<Restaurant>;
}
