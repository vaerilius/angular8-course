import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;


  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
      }
    );
  }

  addNewItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    // this.ingredient.emit(newIngredient);
    this.shoppingService.addIngredient(newIngredient);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
