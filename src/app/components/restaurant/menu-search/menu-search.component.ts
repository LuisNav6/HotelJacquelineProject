import { Component, OnInit } from '@angular/core';
import { MealService } from 'src/app/shared/meal.service';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.scss']
})
export class MenuSearchComponent implements OnInit{
  meals_seaFood: any[] = [];
  meals_meats: any[] = [];
  meals_dessert: any[] = [];
  meals_soups: any[] = [];

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.mealService.getMealsByCategory('SeaFood')
    .subscribe(data => {
      this.meals_seaFood = data.meals?.slice(0, 5);
    });
    this.mealService.getMealsByCategory('Beef')
    .subscribe(data => {
      this.meals_meats = data.meals?.slice(0, 5);
    });
    this.mealService.getMealsByCategory('Dessert')
    .subscribe(data => {
      this.meals_dessert = data.meals?.slice(0, 5);
    });
    this.mealService.getMealsByCategory('Beef')
    .subscribe(data => {
      this.meals_soups = data.meals?.slice(6, 11);
    });
    
  }
}
