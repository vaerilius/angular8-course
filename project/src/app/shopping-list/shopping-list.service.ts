import {Ingredient} from '../shared/ingredient.model';

import {Subject} from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Banana', 3)
  ];
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
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
    this.ingredientsChanged.next(this.ingredients.slice());

  }
}
