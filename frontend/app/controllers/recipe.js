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
    if (!this.newRecipeName || typeof this.newRecipeName !== 'string') {
      alert('Please enter a valid recipe name');
      return;
    }

    if (!this.newCategory || typeof this.newCategory !== 'string') {
      alert('Please enter a valid category');
      return;
    }
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
