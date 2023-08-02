import Model, { attr, hasMany } from '@ember-data/model';

export default class RestaurantModel extends Model {
  @attr('string') name;
  @attr('string') category;
  @hasMany('recipe', { async: true, inverse: 'restaurants' }) recipes;
}
