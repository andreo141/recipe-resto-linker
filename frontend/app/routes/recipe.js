import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class RecipeRoute extends Route {
  async model() {
    try {
      const response = await fetch('http://localhost:5000/random_meal');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
