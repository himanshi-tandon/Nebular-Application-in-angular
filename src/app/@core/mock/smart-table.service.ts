import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [{
    id: 1,
    Name: 'Asia',
    Status: 'Active',
  }, {
    id: 2,
    Name: 'Africa',
    Status: 'Inactive',
  }, {
    id: 3,
    Name: 'Europe',
    Status: 'Active',
  }, {
    id: 4,
    Name: 'North America',
    Status: 'Active',
  }, {
    id: 5,
    Name: 'South America',
    Status: 'Inactive',
  }, {
    id: 6,
    Name: 'Australia',
    Status: 'Inactive',
  }, {
    id: 7,
    Name: 'Antarctica',
    Status: 'Inactive',
  }
];

  getData() {
    return this.data;
  }
}
