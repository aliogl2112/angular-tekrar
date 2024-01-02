import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../categories/category.service';
import { Category } from '../../categories/category.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers:[ProductService,CategoryService]
})
export class CreateProductComponent implements OnInit{
  categories:Category[]=[];
  error:string="";

  //two-way binding - modelde bir değişiklik yapıldığında inputlar, inputda bir değişiklik yapıldığında model etkilenir.
  model:any={
    categoryId:0
  };

  //pristine => controle dokunmak ama yazı yazmamak, dirty => yazı yazmak

  constructor(
    private productService:ProductService,
    private router:Router,
    private categoryService:CategoryService
  ){}
  ngOnInit(){
    this.categoryService.getCategories().subscribe(categories=>{
      this.categories=categories;
    })
  }

  saveProduct(form:NgForm){
    if(this.model.categoryId==0){
      this.error="Lütfen bir kategori seçin.";
      return;
    }

    const extensions=["jpg","jpeg","png"];
    const extension = this.model.imageUrl.split(".").pop();

    if(extensions.indexOf(extension)==-1){
      this.error="Lütfen geçerli bir resim seçin. (Yalnızca jpeg, jpg veya png uzantılı resimler)";
      return;
    }

    const product:Product={
      id:1,
      name:this.model.name,
      description:this.model.description,
      price:this.model.price,
      imgUrl:this.model.imageUrl,
      isActive:this.model.isActive,
      categoryId:this.model.categoryId
    }

    if(form.valid){
      this.productService.createProduct(product).subscribe(data=>{
        this.router.navigate([`/products/${data.name}`])
      });
    }
    else{
      this.error="Lütfen girdiğiniz bilgileri kontrol edin.";
      return;
    }
  
  }

  // saveProduct(name:any,description:any,price:any,imageUrl:any,categoryId:any,isActive:any){
  //   console.log(typeof price.value)
  //   if(name.value.trim()=="" || name.value.length<5){
  //     this.error="İsim bilgisi en az 5 karakter olmalıdır.";
  //     return;
  //   }
  //   if(price.value.trim()==""){
  //     this.error="Lütfen geçerli bir fiyat bilgisi girin.";
  //     return;
  //   }

  //   const extensions =["jpeg","png","jpg"];
  //   const extension = imageUrl.value.split(".").pop();

  //   for(let ext of extensions){
  //     if(extension!=ext){
  //       this.error="Lütfen geçerli bir resim seçin. (Yalnızca jpeg, jpg veya pngn)";
  //       return;
  //     }
  //   }
  //     const product:Product={
  //     id:1,
  //     name:name.value,
  //     description:description.value,
  //     price:price.value,
  //     imgUrl:imageUrl.value,
  //     isActive:isActive.value,
  //     categoryId:categoryId.value,
  //   }
  //   this.productService.createProduct(product).subscribe(data=>{
  //     const id = data.name;
  //     this.router.navigate([`/products/${id}`])
  //   })
  // }

}
