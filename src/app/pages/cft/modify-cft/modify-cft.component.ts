import { Component, OnInit, SimpleChange, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { ManageCftService } from '../../../services/manage-cft.service';
import { CFTDetailsModel } from '../../../@core/models/cftdetails.model';
import { NbDialogService, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { CFTMilestoneModel, MilestoneModel, CFTRemarksModel } from '../../../@core/models/cftmilestones.model';
import { departmentModel, UserModel } from '../../../@core/models/department.model';
import { CFTPostRequestDataModel, } from '../../../@core/models/cft-postrequest.model';
import { NgForm } from '@angular/forms';
import { first, filter } from 'rxjs/operators';
import { CFTCategoryModel } from '../../../@core/models/cft-category.model';
import { forkJoin } from 'rxjs';
import { CFTPartcodeModel } from '../../../@core/models/cft-partcode.model';


@Component({
  selector: 'ngx-modify-cft',
  templateUrl: './modify-cft.component.html',
  styleUrls: ['./modify-cft.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ModifyCftComponent implements OnInit {
  selectedOption: CFTMilestoneModel[] = [];
  selectedCFTCategory: CFTCategoryModel;
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
    // this.selectedOption = ["IQC"]; //[{ department: 'IQC' }]
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
          if (this.editCFTRecord.status.toLowerCase() == 'draft') {
            this.partCodeDetail = this.editCFTRecord.parts;
          } else {
            this.partCodeDetail = [{ partCode: '', partName: '', supplierCode: '', supplierName: '' }];
          }
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
        if (s.milestones) {
          s.milestones.map(data => {
            data.startDate = new Date()
            data.targetDate = new Date();
            let dateCast = new Date(data.startDate);
            dateCast.setDate(dateCast.getDate() + data.targetTime);
            data.targetDate = dateCast;
            data.remarks = [{ remarktext: '', createddate: new Date() }];
            //data.isSelected = this.editCFTRecord.cftMileStoneData.some(j => j.milestones.some(k => k.id == data.id && k.isSelected == true && j.id == s.id));
            //data.empid = this.editCFTRecord.cftMileStoneData.filter(j => j.milestones.filter(k => k.id == data.id && k.isSelected == true && j.id == s.id))[0].milestones[0].empid;
            this.editCFTRecord.cftMileStoneData.filter(j => {
              if (j.milestones) {
                j.milestones.filter(k => {
                  if (k.id == data.id && k.isSelected == true && j.id == s.id) {
                    data.isSelected = k.isSelected;
                    data.empid = k.empid;
                    this.onChangeUser(data.empid, data);
                  }
                })
              }
            }
            );
            data.userList = this.getUserByDepartment(s.department);
            if (data.userList.length == 0) {
              data.userList = [];
            }

          });
        }
      });
      var NoOfDays = this.cfCategoryType.filter(s => s.categoryName == 'Minor').map(d => d.days);
      this.extendDate(NoOfDays);
      setTimeout(() => {
        this.selectedCFTCategory = this.cfCategoryType.filter(s => s.categoryName == this.editCFTRecord.cftCategoryType.categoryName)[0];
        this.changeDate(this.selectedCFTCategory);
        this.selectedOption = this.departmentMileStoneData;
        this.selectedOption = this.selectedOption.filter(qq => {
          if (qq.milestones && qq.milestones.some(ww => ww.isSelected == true)) {
            return qq;
          }
        });
        this.onChangeDepartmentPageLoad(this.selectedOption);
      }, 0);



    })

  }

  getUserByDepartment(deptName): UserModel[] {
    return this.departmentUsers.filter(s => s.department == deptName).map(d => d.users)[0];
  }
  onChangeUser(event: string, milestoneModel: MilestoneModel) {
    milestoneModel.remarks[0].empid = event;
    this.departmentUsers.filter(j => j.users.filter(k => {
      if (k.empid == event && milestoneModel.isSelected == true) {
        milestoneModel.remarks[0].name = k.name;
        milestoneModel.name = k.name;
      }
    }));
  }

  filterData: CFTMilestoneModel[] = [];
  onChangeDepartment(e: CFTMilestoneModel[]) {
    this.setFilterDataValue(e);
    return;

  }
  setFilterDataValue(e: CFTMilestoneModel[]) {
    this.filterData = this.departmentMileStoneData.filter((filtemilestone) => {
      if (!e.map(s => s.department).includes(filtemilestone.department)) {
        if (filtemilestone.milestones) {
          filtemilestone.milestones.map(x => x.isSelected = false);
        }
      }
      if (e.filter((milestonedata) => {
        if (milestonedata.department.toLowerCase() == filtemilestone.department.toLowerCase()) {
          return milestonedata
        }
      }).length > 0) {
        return filtemilestone;
      }
    })
  }

  onChangeDepartmentPageLoad(e: CFTMilestoneModel[]) {

    this.filterData = this.departmentMileStoneData.filter((filtemilestone) => {
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
    this.cftPostRequestDataModel.cftDetails.parts = this.partCodeDetail;

    if (form.valid && this.filterData.length > 0) {
      if (this.cftPostRequestDataModel.actionType == 'draft') {
        this.cftPostRequestDataModel.cftDetails.status = 'DRAFT';
      }
      else if (this.cftPostRequestDataModel.actionType == 'save') {
        this.cftPostRequestDataModel.cftDetails.status = 'CREATED';
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


