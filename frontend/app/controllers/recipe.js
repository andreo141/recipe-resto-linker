import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import ArrayProxy from '@ember/array/proxy';

export default class RecipeController extends Controller {
  @tracked newRecipeName;
  @tracked newCategory;
  @tracked newRestaurant;
  @tracked existingRestaurant;
  @tracked existingRecipe;
  @tracked restaurants;
  @tracked recipes;
  @service store;

  constructor() {
    super(...arguments);
  }

  async init() {
    super.init();

    try {
      this.restaurants = await this.store.findAll('restaurant');
    } catch (e) {
      console.error('Error fetching restaurants:', e);
    }

    try {
      this.recipes = await this.store.findAll('recipe');
    } catch (e) {
      console.error('Error fetching restaurants:', e);
    }
  }

  @action
  async selectRestaurant(event) {
    const selectedRestaurantId = event.target.value;
    this.existingRestaurant = await this.store.findRecord(
      'restaurant',
      selectedRestaurantId
    );
  }

  @action
  async selectRecipe(event) {
    const selectedRecipeId = event.target.value;
    this.existingRecipe = await this.store.findRecord(
      'recipe',
      selectedRecipeId
    );
  }

  @action
  async createRecipe(event) {
    event.preventDefault();
    if (!this.newRecipeName) {
      alert('Please enter a valid recipe name');
      this.clearInputFields();
      return;
    }
    if (!this.newCategory) {
      alert('Please enter a valid category');
      this.clearInputFields();
      return;
    }
    const recipe = await this.store.createRecord('recipe', {
      name: this.newRecipeName,
      category: this.newCategory,
    });
    try {
      await recipe.save();
      this.clearInputFields();
    } catch (e) {
      console.error('Error creating recipe:', e);
    }
  }

  @action
  async updateRecipe(event) {
    event.preventDefault();
    if (!this.existingRecipe) {
      alert('Please select a recipe to update');
      return;
    }
    if (!this.existingRestaurant) {
      alert('Please select a restaurant to update');
      return;
    }

    try {
      let currentRecipe = await this.store.findRecord(
        'recipe',
        this.existingRecipe.id
      );
      let currentRestaurant = await this.store.findRecord(
        'restaurant',
        this.existingRestaurant.id
      );
      let existingRestaurants = await currentRecipe.restaurants;
      existingRestaurants.pushObject(currentRestaurant);
      await currentRecipe.save();
    } catch (e) {
      console.error('Error updating recipe:', e);
    }
  }

  @action
  removeRecipe(recipe, event) {
    event.preventDefault();
    recipe.destroyRecord();
  }

  @action
  clearInputFields() {
    this.newRecipeName = '';
    this.newCategory = '';
  }
}
