import { Product } from "../products/product.model";

export class ProductRepository{
    private products:Product[]=[
        {id:2,name:"Iphone 15",description:"İyi Telefon",price:22000,imgUrl:"1.jpeg",isActive:true,categoryId:1},
        {id:1,name:"Iphone 14",description:"İyi Telefon",price:20000,imgUrl:"2.jpeg",isActive:false,categoryId:1},
        {id:3,name:"Iphone 16",description:"İyi Telefon",price:24000,imgUrl:"3.jpeg",isActive:true,categoryId:1},
        {id:4,name:"Iphone 17",description:"İyi Telefon",price:26000,imgUrl:"1.jpeg",isActive:true,categoryId:2},
        {id:5,name:"Iphone 18",description:"İyi Telefon",price:26000,imgUrl:"2.jpeg",isActive:true,categoryId:2},
        {id:5,name:"Iphone 19",description:"İyi Telefon",price:26000,imgUrl:"3.jpeg",isActive:true,categoryId:3}
    ]

    getProducts():Product[]{
        return this.products.filter(p=>p.isActive);
    }
    getProductsById(productId:number):Product|undefined{
        return this.products.find(p=>productId==p.id);
    }
    getProductsByCategoryId(categoryId:number):Product[]{
        return this.products.filter(product=>categoryId==product.categoryId);
    }
}