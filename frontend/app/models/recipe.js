import Model, { attr, hasMany } from '@ember-data/model';

export default class RecipeModel extends Model {
  @attr('string') name;
  @attr('string') category;
  @hasMany('restaurant', { async: true, inverse: 'recipes' }) restaurants;
}
