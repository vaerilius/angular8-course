import {Ingredient} from '../../shared/ingredient.model';
import {Action} from '@ngrx/store';
import {ADD_INGREDIENT} from './shopping-list.actions'

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Banana', 3)
  ]
};

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients], action
      }
  }
}
