import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class RecipeController extends Controller {
  @tracked newRecipeName;
  @tracked newCategory;
  @tracked restaurants;
  @tracked newRestaurant;

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
  }

  @action
  async selectRestaurant(event) {
    const selectedRestaurantId = event.target.value;
    this.existingRestaurant = await this.store.findRecord(
      'restaurant',
      selectedRestaurantId
    );
    console.log('this.existingRestaurant', this.existingRestaurant); // debug
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

    const recipe = this.store.createRecord('recipe', {
      name: this.newRecipeName,
      category: this.newCategory,
    });

    try {
      await recipe.save();
      recipe.restaurant = [this.existingRestaurant];
      console.debug('recipe.restaurant', recipe.restaurant); // debug
      await recipe.save();
    } catch (e) {
      console.error('Error creating recipe:', e);
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
