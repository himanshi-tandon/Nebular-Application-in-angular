import { Component, OnInit } from '@angular/core';
import { ManageCftService } from '../../../services/manage-cft.service';
import { CFTDetailsModel } from '../../../@core/models/cftdetails.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-view-cft',
  templateUrl: './view-cft.component.html',
  styleUrls: ['./view-cft.component.scss']
})


export class ViewCftComponent implements OnInit {
  cftDData: CFTDetailsModel[];
  searchTerm: string;
  constructor(private activeRoute: ActivatedRoute, private router: Router, private managecftservice: ManageCftService) {

  }
  EditCft(item) {
    this.managecftservice.setCFTRecordStateForEdit(item).subscribe(data => {
      console.log(data);
      this.router.navigate(['../modify-cft'], { relativeTo: this.activeRoute });

    })
  }
  ngOnInit() {
    this.managecftservice.getCFTDetails().subscribe(Data => {
      this.cftDData = Data;
    })

  }



}

