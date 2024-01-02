import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes:Routes=[
  {path:"",redirectTo:"home",pathMatch:'full'},//pathMatch full demek yalnızca boş bırakıldığında yönlendirmeye tabi tut demek.
  {path:"**",component:NotFoundComponent}//** herhangi bir eşleşme olmadığında demek
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
