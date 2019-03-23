import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyNewComponentComponent } from 'src/app/my-new-component/my-new-component.component';


const routes: Routes = [

 
  { path: 'A', pathMatch: 'full', component: MyNewComponentComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
