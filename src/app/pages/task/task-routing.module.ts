import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task.component';
import { TaskByUserComponent } from './task-by-user/task-by-user.component';

const routes: Routes = [{
  path: '',
  component: TaskComponent,
  children: [
    {
      path: 'task-by-user',
      component: TaskByUserComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule { }

export const routedComponents = [
  TaskComponent,
  TaskByUserComponent
];
