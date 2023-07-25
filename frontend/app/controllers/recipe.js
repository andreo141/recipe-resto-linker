import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class RecipeController extends Controller {
  @tracked newRecipeName = '';
  @tracked newCategory = '';

  @service store;

  @action
  createRecipe(event) {
    event.preventDefault();
    // create the new book
    const recipe = this.store.createRecord('recipe', {
      name: this.newRecipeName,
      category: this.newCategory,
    });
    recipe.save();
    // clear the input fields
    this.newRecipeName = '';
    this.newCategory = '';
  }
  @action
  removeRecipe(recipe, event) {
    event.preventDefault();
    recipe.destroyRecord();
  }
}
