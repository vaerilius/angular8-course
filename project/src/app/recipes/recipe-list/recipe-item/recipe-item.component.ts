import {Component, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {RecipeService} from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeSelected: RecipeService) {
  }

  ngOnInit() {
  }

  onSelected() {
    this.recipeSelected.recipeSelected.emit(this.recipe);
  }
}
