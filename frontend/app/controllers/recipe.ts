import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Restaurant from 'frontend/models/restaurant';
import Recipe from 'frontend/models/recipe';
import Store from '@ember-data/store';

export default class RecipeController extends Controller {
  @tracked newRecipeName: string = '';
  @tracked newCategory: string = '';
  @tracked newRestaurant: string = '';
  @tracked existingRestaurant?: Restaurant;
  @tracked existingRecipe?: Recipe;
  @tracked restaurants: Restaurant[] = [];
  @tracked recipes: Recipe[] = [];
  @service store!: Store;

  async init(): Promise<void> {
    super.init();

    try {
      this.restaurants = (
        await this.store.findAll('restaurant')
      ).toArray() as Restaurant[];
    } catch (e) {
      console.error('Error fetching restaurants:', e);
    }

    try {
      this.recipes = (await this.store.findAll('recipe')).toArray() as Recipe[];
    } catch (e) {
      console.error('Error fetching recipes:', e);
    }
  }

  @action
  async selectRestaurant(event: Event): Promise<void> {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const selectedRestaurantId = target.value;
      this.existingRestaurant = await this.store.findRecord(
        'restaurant',
        selectedRestaurantId
      );
    }
  }

  @action
  async selectRecipe(event: Event): Promise<void> {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const selectedRecipeId = target.value;
      this.existingRecipe = await this.store.findRecord(
        'recipe',
        selectedRecipeId
      );
    }
  }

  @action
  async createRecipe(event: Event): Promise<void> {
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
    }) as Recipe;

    try {
      await recipe.save();
      this.clearInputFields();
    } catch (e) {
      console.error('Error creating recipe:', e);
    }
  }

  @action
  async updateRecipe(event: Event): Promise<void> {
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
      const currentRecipe = (await this.store.findRecord(
        'recipe',
        this.existingRecipe.id
      )) as Recipe;
      const currentRestaurant = (await this.store.findRecord(
        'restaurant',
        this.existingRestaurant.id
      )) as Restaurant;
      const existingRestaurants = await currentRecipe.restaurants;
      existingRestaurants.pushObject(currentRestaurant);
      await currentRecipe.save();
    } catch (e) {
      console.error('Error updating recipe:', e);
    }
  }

  @action
  async removeRecipe(recipe: Recipe, event: Event): Promise<void> {
    event.preventDefault();
    await recipe.destroyRecord();
  }

  @action
  clearInputFields(): void {
    this.newRecipeName = '';
    this.newCategory = '';
  }
}
