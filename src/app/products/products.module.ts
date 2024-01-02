import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductComponent } from "./product-list/product/product.component";
import { CreateProductComponent } from "./create-product/create-product.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AdminGuard } from "../authentication/guards/admin.guard";

const routes:Routes=[
    {
        path:"products",
        children:[
            {path:"create",component:CreateProductComponent,canActivate:[AdminGuard]},
            {path:"",component:ProductListComponent},
            {path:":productId",component:ProductComponent},
            {path:"category/:categoryId",component:ProductListComponent}, //path ile başa gelecek kısmı children ile devamını ekledik products/create
        ]
    }
]

@NgModule({
    declarations:[
        ProductListComponent,
        ProductComponent,
        CreateProductComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports:[
        ProductListComponent,
        ProductComponent,
        CreateProductComponent
    ]
})
export class ProductsModule{

}