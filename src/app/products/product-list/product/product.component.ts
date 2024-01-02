import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../product.model';
 import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[ProductService]
})
export class ProductComponent {

product:Product;
constructor(
  private route:ActivatedRoute,
  private productService:ProductService
){}

ngOnInit():void{
  this.route.params.subscribe(param=>{
    const id = param["productId"];
    this.productService.getProductById(id).subscribe(data=>this.product={...data,id:id})
  })
}








  // @Input() product:Product;
  // @Output() unSelectEvent=new EventEmitter<void>; //herhangi bir param göndermediğimizden türüne void diyoruz
  //@Output() unSelectEvent=new EventEmitter<string>; //string param gönderdiğimizi varsayalım
  // unSelectProduct(){
  //   this.unSelectEvent.emit();//emit, veriyi gönderiyor
    //this.unSelectEvent.emit("asdsad");string param gönderdiğimiz için bu şekilde kullanıyoruz
  //}
}
