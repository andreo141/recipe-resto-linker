import Model, { attr } from '@ember-data/model';

export default class RecipeModel extends Model {
  @attr('string') meal;
  @attr('string') strMealThumb;
  @attr('string') mealImageUrl;
}
