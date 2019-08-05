import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from "@angular/core";

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Banana', 3)
  ];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredientsFromService: Ingredient[]) {
    //   ingredientsFromService.forEach(i => {
    //       this.addIngredient(i);
    //     });

    // !! array of Elements to List of Elements !!
    this.ingredients.push(...ingredientsFromService);
    this.ingredientsChanged.emit(this.ingredients.slice());

  }
}
