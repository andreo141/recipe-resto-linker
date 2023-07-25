import Model, { attr } from '@ember-data/model';

export default class RecipeModel extends Model {
  @attr('string') name;
  @attr('string') category;
}
