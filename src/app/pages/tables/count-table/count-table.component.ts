import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table1';
/* import { NbButtonModule } from '@nebular/theme'; */

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './count-table.component.html',
  styleUrls: ['./count-table.component.scss'],
})
/* @NgModule({
  imports: [
    NbButtonModule,
  ],
}) */
export class SmartTableComponent1 {
  
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
      Continent_id: {
        title: 'Continent Id',
        type: 'number',
      },
       sortname: {
        title: 'Name',
        type: 'string',
      }, 
      phoneCode: {
        title: 'PhoneCode',
        type: 'string',
      },/*
      Status: {
        title: 'status',
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
