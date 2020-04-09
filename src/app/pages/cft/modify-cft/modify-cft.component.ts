import { Component, OnInit, SimpleChange, HostBinding } from '@angular/core';
import { ManageCftService } from '../../../services/manage-cft.service';
import { CFTDetailsModel } from '../../../@core/models/cftdetails.model';
import { NbDialogService, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { CFTMilestoneModel, MilestoneModel, CFTRemarksModel } from '../../../@core/models/cftmilestones.model';
import { departmentModel, UserModel } from '../../../@core/models/department.model';
import { CommonAPIResponseCode } from '../../../@core/models/common-contsant';
import { CFTPostRequestDataModel, } from '../../../@core/models/cft-postrequest.model';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CFTCategoryModel } from '../../../@core/models/cft-category.model';
import { forkJoin } from 'rxjs';
import { CFTPartcodeModel } from '../../../@core/models/cft-partcode.model';


@Component({
  selector: 'ngx-modify-cft',
  templateUrl: './modify-cft.component.html',
  styleUrls: ['./modify-cft.component.scss']
})

export class ModifyCftComponent implements OnInit {
  status = 'primary';
  ngModelDate = new Date().toString();
  totalEstimate = 10;
  ctx = { estimate: this.totalEstimate };
  editCFTRecord: CFTDetailsModel = new CFTDetailsModel();
  departmentUsers: Array<departmentModel> = [];
  userData: Array<UserModel> = [];
  partCodeDetail: Array<CFTPartcodeModel> = [];
  filteredmilestone: Array<departmentModel> = [];
  cftPostRequestDataModel: CFTPostRequestDataModel = new CFTPostRequestDataModel();
  cfCategoryType: Array<CFTCategoryModel> = []
  departmentMileStoneData: Array<CFTMilestoneModel> = [];
  constructor(private toastrService: NbToastrService, private activeRoute: ActivatedRoute, private router: Router, private manageCFTService: ManageCftService, private dialogService: NbDialogService) {
  }

  Cancel() {
    this.router.navigate(['../view-cft'], { relativeTo: this.activeRoute });
  }
  ngOnInit() {

    this.partCodeDetail = [{ partCode: '', partName: '', supplierCode: '', supplierName: '' }];
    this.editCFTRecord.cftCreationDate = new Date();
    this.manageCFTService.cftRecord.pipe(first()).subscribe(item => {
      if (item.scrNo != null) {
        item.revisionNo = 1,
          item.revisedBy = "Salesh";
        item.approvedBy = "Salesh";
        item.createdBy = "Salesh";
        this.manageCFTService.postCFTUpdate(item).subscribe(data => {
          this.editCFTRecord = data;
          this.editCFTRecord.cftCreationDate = new Date();
          this.BindData();
        })
      } else {
        this.router.navigate(['../view-cft'], { relativeTo: this.activeRoute });
      }
    });

  }
 
  BindData() {
    forkJoin(this.manageCFTService.getCategoryList(), this.manageCFTService.getUserListByDepartment(), this.manageCFTService.getMilestoneListByDepartment()).subscribe(result => {
      this.cfCategoryType = result[0];
      this.departmentUsers = result[1];
      this.departmentMileStoneData = result[2];
      this.departmentMileStoneData.map(s => {
        s.milestones.map(data => {
          data.startDate = new Date()
          data.targetDate = new Date();
          let dateCast = new Date(data.startDate);
          dateCast.setDate(dateCast.getDate() + data.targetTime);
          data.targetDate = dateCast;
          data.remarks = [{ remarktext: '', createddate: new Date() }];
        });

      });

      var NoOfDays = this.cfCategoryType.filter(s => s.categoryName == 'Minor').map(d => d.days);
      this.extendDate(NoOfDays);
    })
  }
  ngAfterViewInit() {

  }
  getUserByDepartment(deptName): UserModel[] {
    return this.departmentUsers.filter(s => s.department == deptName).map(d => d.users)[0];
  }
  onChangeUser(event, milestoneModel: MilestoneModel) {
    milestoneModel.remarks[0].empid = event;
    milestoneModel.remarks[0].name = (this.departmentUsers.map(s => s.users)[0].filter(t => t.empid == event)).map(u => u.name)[0];
  }

  filterData: CFTMilestoneModel[] = [];
  onChangeDepartment(e: departmentModel[]) {
    this.filterData = this.departmentMileStoneData.filter((filtemilestone) => {
      console.log(this.filterData);
      if (e.filter((milestonedata) => {
        if (milestonedata.department.toLowerCase() == filtemilestone.department.toLowerCase()) {
          return milestonedata
        }
      }).length > 0) {
        return filtemilestone;
      }

    })
  }
  addPartCode(event: Event) {

    this.partCodeDetail.push({ partCode: '', partName: '', supplierCode: '', supplierName: '' });
    event.preventDefault();
    event.stopPropagation();
  }
  submitCFTData(actionType, form: NgForm) {
    this.cftPostRequestDataModel.cftDetails = this.editCFTRecord;
    this.cftPostRequestDataModel.cftMileStoneData = this.filterData;
    this.cftPostRequestDataModel.actionType = actionType;
    this.cftPostRequestDataModel.parts = this.partCodeDetail;
    if (form.valid && this.filterData.length > 0) {
      if (this.cftPostRequestDataModel.actionType == 'draft') {
        this.cftPostRequestDataModel.cftMileStoneData.map(s => s.milestones.map(d => {
          if (d.isSelected == true) {
            d.status = 'draft'
          }
        }))
      }
      else if (this.cftPostRequestDataModel.actionType == 'save') {
        this.cftPostRequestDataModel.cftMileStoneData.map(s => s.milestones.map(d => {
          if (d.isSelected == true) {
            d.status = 'created'

          }
        }))
      }

      this.manageCFTService.postCFTMilestone(this.cftPostRequestDataModel).subscribe(
        (data) => {
          this.showToast('success', data.messageDto.message, 'Success');
          this.router.navigate(['../view-cft'], { relativeTo: this.activeRoute });
        }, (error) => {
          this.showToast('danger', 'Something went wrong.', 'Error');
        });
    }

  }
  extendDate(nofdays) {
    this.editCFTRecord.targetDate = new Date();
    let dateExtendion = new Date(this.editCFTRecord.targetDate);
    dateExtendion.setDate(dateExtendion.getDate() + nofdays);
    this.editCFTRecord.targetDate = dateExtendion;
  }

  extendMileStoneTargetDate(extendMileStoneTargetDate: MilestoneModel): Date {
    let dateExtendion = extendMileStoneTargetDate.startDate;
    extendMileStoneTargetDate.targetDate.setDate(dateExtendion.getDate() + extendMileStoneTargetDate.targetTime);
    return extendMileStoneTargetDate.targetDate;
  }
  formatDate(controlName, extendMileStoneTargetDate: MilestoneModel, startDate: Date) {
    switch (controlName) {
      case 'mileStoneCreationDate':
        extendMileStoneTargetDate.targetDate = new Date();
        let dateExtendion = new Date(startDate);
        extendMileStoneTargetDate.targetDate.setDate(dateExtendion.getDate() + Number(extendMileStoneTargetDate.targetTime));
        break;
      default:
        break;
    }

  }

  extendDateByNumberOfDays(controlName, extendMileStoneTargetDate: MilestoneModel) {
    switch (controlName) {
      case 'mileStoneCreationDate':
        extendMileStoneTargetDate.targetDate = new Date();
        let dateExtension = new Date(extendMileStoneTargetDate.startDate.toString());
        extendMileStoneTargetDate.targetDate.setDate(dateExtension.getDate() + Number(extendMileStoneTargetDate.targetTime));
        break;
      default:
        break;
    }

  }
  changeDate(categoryType: CFTCategoryModel) {
    this.extendDate(categoryType.days);
    this.editCFTRecord.cftCategoryType = categoryType;


  }

  showNoRecord(): boolean {
    if (this.filterData.length > 0) {
      return JSON.stringify(this.filterData).indexOf('"isSelected":true') == -1;
    } else {
      return true;
    }
  }

  @HostBinding('class')
  classes = 'example-items-rows';
  showToast(status: NbComponentStatus, message, title) {
    this.toastrService.show(message, title, { status });

  }

}


