import { Component, OnInit } from '@angular/core';
import { ManageCftService } from '../../../services/manage-cft.service';
import { CFTDetailsModel } from '../../../@core/models/cftdetails.model';
import { NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-view-cft',
  templateUrl: './view-cft.component.html',
  styleUrls: ['./view-cft.component.scss']
})


export class ViewCftComponent implements OnInit {
  cftDData: CFTDetailsModel[];
  // items = [];
  // pageOfItems: Array<any>;
  constructor(private activeRoute: ActivatedRoute,private router: Router, private managecftservice: ManageCftService, private dataSourceBuilder: NbTreeGridDataSourceBuilder<CFTDetailsModel>) { }
  EditCft(item) {
    this.managecftservice.setCFTRecordStateForEdit(item).subscribe(data => {
      console.log(data);
     // this.router.navigate(['/cft/modify-cft']);
      this.router.navigate(['../modify-cft'], { relativeTo: this.activeRoute});

    })
  }
  ngOnInit() {
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));

    this.managecftservice.getCFTDetails().subscribe(Data => {
      let temp = Data;
      this.cftDData = Data;
    })

  }
//   onChangePage(pageOfItems: Array<any>) {
//     // update current page of items
//     this.pageOfItems = pageOfItems;
// }


}

