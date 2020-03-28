import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
/* import { NbButtonModule } from '@nebular/theme'; */

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './conti-table.component.html',
  styleUrls: ['./conti-table.component.scss'],
})
/* @NgModule({
  imports: [
    NbButtonModule,
  ],
}) */
export class SmartTableComponent {
  
  settings = {
     hideSubHeader: true ,
   /* add: false,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    }, */ 
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    actions: {
      add: false,
      position: 'right',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
      
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      Name: {
        title: 'Continent Name',
        type: 'string',
      },
      /* lastName: {
        title: 'Last Name',
        type: 'string',
      }, 
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      }, */
       Status: {
         title: 'Status',
         type: 'string',
       }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
