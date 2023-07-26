import Model, { attr } from '@ember-data/model';

export default class RestaurantModel extends Model {
  @attr('string') name;
  @attr('string') item;
}
