import {Ingredient} from '../shared/ingredient.model';

export class ShoppingListService {

 private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Banana', 3)
  ];

 addIngredient(ingredient: Ingredient) {
   this.ingredients.push(ingredient);
 }
 getIngredients() {
   return this.ingredients.slice();
 }
}
