import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CFTComponent } from './cft.component';
import {ModifyCftComponent} from './modify-cft/modify-cft.component';
import {ViewCftComponent} from './view-cft/view-cft.component';
const routes: Routes = [{
  path: '',
  component: CFTComponent,
  children: [
    {
      path: 'modify-cft',
      component: ModifyCftComponent,
    },
    {
      path: 'view-cft',
      component: ViewCftComponent,
    }
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CFTRoutingModule { }

export const routedComponents = [
    CFTComponent,
    ModifyCftComponent,
    ViewCftComponent,
];
