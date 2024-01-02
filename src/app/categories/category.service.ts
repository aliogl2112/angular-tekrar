import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class CategoryService {

  private url="https://shop-app-173a5-default-rtdb.firebaseio.com/"

  constructor(
    private http:HttpClient
  ) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.url+"categories.json")
    .pipe(
      map(data=>{
        const categories:Category[]=[];

        for(const key in data){
          categories.push({...data[key],id:key})
        }

        return categories;
      })
    )
  }

  getCategoryById(categoryId:any):Observable<Category>{
    return this.http.get<Category>(this.url+"categories/"+categoryId+".json")
  }

  createCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(this.url+"categories.json",category)
  }

}
