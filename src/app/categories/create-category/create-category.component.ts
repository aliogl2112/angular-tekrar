import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
  providers:[CategoryService]
})
export class CreateCategoryComponent {
  constructor(
    private categoryService:CategoryService
  ){}
  saveCategory(categoryName:any){
    const category:Category={
      id:1,
      name:categoryName.value
    }
    this.categoryService.createCategory(category).subscribe(data=>{
      window.location.reload();
    })
  }
}
