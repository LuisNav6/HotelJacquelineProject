import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrlMeals = 'https://www.themealdb.com/api/json/v1/1';
  constructor(private http: HttpClient) { }

  getMealsByCategory(category:string): Observable<any> {
    const url = `${this.apiUrlMeals}/filter.php?c=${category}`;
    return this.http.get(url);
  }

}
