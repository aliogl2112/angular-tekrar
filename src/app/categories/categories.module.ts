import { NgModule } from "@angular/core";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CreateCategoryComponent } from "./create-category/create-category.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AdminGuard } from "../authentication/guards/admin.guard";

@NgModule({
    declarations:[
        CategoryListComponent,
        CreateCategoryComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path:"categories/create",component:CreateCategoryComponent,canActivate:[AdminGuard]},
        ])
    ],
    exports:[
        CategoryListComponent,
        CreateCategoryComponent
    ]
})
export class CategoriesModule{}