import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class RecipeRoute extends Route {
  async model() {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php'
      );
      const data = await response.json();
      return data.meals[0];
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
