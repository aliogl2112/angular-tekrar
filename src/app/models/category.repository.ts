import { Category } from "../categories/category.model";

export class CategoryRepository{
    private categories:Category[]=[
        {id:1,name:"Telefon"},
        {id:2,name:"Bilgisayar"},
        {id:3,name:"Televizyon"},
    ]

    getCategories():Category[]{
        return this.categories;
    }

    getCategoryById(id:any):Category | undefined{
        return this.categories.find(category=>category.id==id);
    }
}