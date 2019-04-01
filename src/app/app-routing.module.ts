import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyNewComponentComponent } from 'src/app/my-new-component/my-new-component.component';
import { MyChatComponent } from './my-chat/my-chat.component';


const routes: Routes = [
 
  { path: 'A', pathMatch: 'full', component: MyNewComponentComponent  },
  { path: 'Chat', pathMatch: 'full', component: MyChatComponent  },
  { path: 'chat', pathMatch: 'full', component: MyChatComponent  },
  { path: '', pathMatch: 'full', component: MyChatComponent  },
  { path: '**', pathMatch: 'full', component: MyChatComponent  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
