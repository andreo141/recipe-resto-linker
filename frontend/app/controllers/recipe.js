import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class RecipeController extends Controller {
  @action
  async getRandomMeal() {
    try {
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
