import Model, { attr, hasMany } from '@ember-data/model';

export default class RestaurantModel extends Model {
  @attr('string') name;
  @attr('string') item;
  @hasMany('recipe', { async: true }) recipe;
}
