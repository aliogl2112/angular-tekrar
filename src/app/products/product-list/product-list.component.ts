import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers:[ProductService]//local servisler privders içerisinde tanımlanmak zorunda
})
export class ProductListComponent implements OnInit{
  products:Product[]=[];
  selectedItem:Product | null;
  loading:boolean=false;

  constructor(
    private route:ActivatedRoute,
    private http:HttpClient,
    private productService:ProductService
  ){}
  ngOnInit():void{
    this.route.params.subscribe(param=>{
      this.loading=true;
      this.productService.getProducts(param["categoryId"]).subscribe(data=>{
        this.products=data;
        this.loading=false;
      })   
    })
  }












  // unSelectProduct(){
  //   this.selectedItem=null
  // }
}
