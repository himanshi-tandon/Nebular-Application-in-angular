import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table1';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [{
    id: 1,
    Continent_id:1,
    sortname: 'IN',
    name:'India',
    phoneCode:91,
    Status: 'Active',
  }, {
    id: 2,
    Continent_id:2,
    sortname: 'GH',
    name:'Ghana',
    phoneCode:233,
    Status: 'Inactive',
  }, {
    id: 3,
    Continent_id:3,
    sortname: 'RO',
    name:'Rome',
    phoneCode:39,
    Status: 'Active',
  }, {
    id: 4,
    Continent_id:1,
    sortname: 'PK',
    name:'Pakistan',
    phoneCode:92,
    Status: 'Active',
  }
];

  getData() {
    return this.data;
  }
}
