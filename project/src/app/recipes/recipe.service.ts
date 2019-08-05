import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Burger',
      'Nam Nam',
      'https://images.unsplash.com/photo-1548946522-4a313e8972a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1340&q=80',
      [
        new Ingredient('Meat', 2),
        new Ingredient('Bread', 1),
        new Ingredient('chili', 1)
      ]),
    new Recipe('Chili Burger',
      'HOT HOT!!',
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      [
        new Ingredient('Meat', 3),
        new Ingredient('French fries', 1),
        new Ingredient('banana', 2)]
    )];
  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addToServiceShoppingList(ingredients: Ingredient[]) {
  this.shoppingListService.addIngredients(ingredients);
  }

}
