import { Component, OnInit } from '@angular/core';
import { ManageCftService } from '../../../services/manage-cft.service';
import { CFTDetailsModel } from '../../../@core/models/cftdetails.model';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'ngx-modify-cft',
  templateUrl: './modify-cft.component.html',
  styleUrls: ['./modify-cft.component.scss']
})
export class ModifyCftComponent implements OnInit {
  today: number = Date.now();
  editCFTRecord: CFTDetailsModel = new CFTDetailsModel();
  constructor(private activeRoute: ActivatedRoute, private router: Router, private manageCFTService: ManageCftService, private dialogService: NbDialogService) { }

  Cancel() {
    this.router.navigate(['../view-cft'], { relativeTo: this.activeRoute });
  }
  reload() {
    this.router.navigate(['../view-cft']);
  }



  ngOnInit() {

    this.manageCFTService.cftRecord.subscribe(item => {
      if (Object.keys(item).length === 0) {
        this.router.navigate(['../view-cft'], { relativeTo: this.activeRoute });
      }
      this.editCFTRecord = item;
     
      this.extendDate(30);

    })
  }

  extendDate(nofdays){
    this.editCFTRecord.targetDate = new Date().toDateString();
    let nofdaystoextend = new Date(this.editCFTRecord.targetDate);
    nofdaystoextend.setDate(nofdaystoextend.getDate() + nofdays);
    this.editCFTRecord.targetDate = nofdaystoextend.toDateString();
    console.log(nofdaystoextend);
  }

  changeDate(categoryType) {
    console.log(categoryType);
   

    switch (categoryType) {
      case '1':
        this.extendDate(30);
        break;

      case '2':
        this.extendDate(90);
        break;

      default: break;

    }

  }

}
