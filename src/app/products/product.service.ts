import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, delay, exhaustMap, map, take, tap} from 'rxjs'
import { Product } from './product.model';
import { AuthService } from '../authentication/auth.service';

@Injectable() //local service
export class ProductService {
  
  private url="https://shop-app-173a5-default-rtdb.firebaseio.com/";
  private token:string

  constructor(
    private http:HttpClient,
    private authService:AuthService
  ) { }

  getProducts(categoryId?:any):Observable<Product[]>{
    return this.http.get<Product[]>(this.url+"products.json")
    .pipe( 
      map(data=>{
        const products:Product[]=[]
        for(let key in data){
          if(categoryId){
            if(categoryId==data[key].categoryId)
              products.push({...data[key],id:key})
          }
          else
            products.push({...data[key],id:key})
         }
        return products
      }),
      delay(1000)//verinin gelme süresini uzatır. ms cinsinden yazılır
    );
  }

  createProduct(product:Product):Observable<Product>{
    return this.authService.user.pipe(
      take(1),
      tap(user=>console.log(user)),
      exhaustMap(user=>{
        return this.http.post<Product>(this.url+"products.json?auth="+user?.token,product);
      })
    )
   
  }

  getProductById(productId:any):Observable<Product>{
    return this.http.get<Product>(this.url+"/products/"+productId+".json")
  }

}
