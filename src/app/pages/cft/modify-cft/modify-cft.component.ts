import { Component, OnInit, SimpleChange } from '@angular/core';
import { ManageCftService } from '../../../services/manage-cft.service';
import { CFTDetailsModel } from '../../../@core/models/cftdetails.model';
import { NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { CFTMilestoneModel, MilestoneModel } from '../../../@core/models/cftmilestones.model';
import { departmentModel, UserModel } from '../../../@core/models/department.model';
import { FormControl } from '@angular/forms';
import { CFTPostRequestDataModel } from '../../../@core/models/cft-postrequest.model';


@Component({
  selector: 'ngx-modify-cft',
  templateUrl: './modify-cft.component.html',
  styleUrls: ['./modify-cft.component.scss']
})

export class ModifyCftComponent implements OnInit {
  ngModelDate = new Date().toString();
  totalEstimate = 10;
  ctx = { estimate: this.totalEstimate };
  editCFTRecord: CFTDetailsModel = new CFTDetailsModel();
  departmentData: Array<departmentModel> = [];
  userData: Array<UserModel> = [];
  filteredmilestone: Array<departmentModel> = [];
  cftPostRequestDataModel: CFTPostRequestDataModel = new CFTPostRequestDataModel();
  constructor(private activeRoute: ActivatedRoute, private router: Router, private manageCFTService: ManageCftService, private dialogService: NbDialogService) {
  }

  Cancel() {
    this.router.navigate(['../view-cft'], { relativeTo: this.activeRoute });
  }

  ngOnInit() {
    this.manageCFTService.cftRecord.subscribe(item => {
      this.editCFTRecord = item;
      this.editCFTRecord.cftCreationDate = new Date();
      this.editCFTRecord.revisedDate = new Date();
      this.extendDate(30);
    })
    this.dummyData.map(s => {
      s.Milestones.map(data => {
        data.startDate = new Date()
        data.targetDate = new Date();
        let dateCast = new Date(data.startDate);
        dateCast.setDate(dateCast.getDate() + data.targetTime);
        data.targetDate = dateCast;
      });
    });
  }


  getUserByDepartment(deptName): UserModel[] {
    return this.dummyDepartmentData.filter(s => s.department == deptName).map(d => d.users)[0];
  }


  filterData: CFTMilestoneModel[];
  onChangeDepartment(e: departmentModel[]) {
    this.filterData = this.dummyData.filter((filtemilestone) => {
      if (e.filter((milestonedata) => {
        if (milestonedata.department.toLowerCase() == filtemilestone.department.toLowerCase()) {
          return milestonedata
        }
      }).length > 0) {
        return filtemilestone;
      }
    });


  }
  submitCFTData(data) {
    this.cftPostRequestDataModel.cftDetails = this.editCFTRecord;
    this.cftPostRequestDataModel.cftMileStoneData = this.filterData;
    this.cftPostRequestDataModel.actionType = data;
    this.manageCFTService.cftPostRequestData(this.cftPostRequestDataModel).subscribe(data => {

    });
  }
  extendDate(nofdays) {
    this.editCFTRecord.targetDate = new Date();
    let dateExtendion = new Date(this.editCFTRecord.targetDate);
    dateExtendion.setDate(dateExtendion.getDate() + nofdays);
    this.editCFTRecord.targetDate = dateExtendion;
  }

  extendMileStoneTargetDate(extendMileStoneTargetDate: MilestoneModel): Date {
    console.log(extendMileStoneTargetDate);
    let dateExtendion = extendMileStoneTargetDate.startDate;
    extendMileStoneTargetDate.targetDate.setDate(dateExtendion.getDate() + extendMileStoneTargetDate.targetTime);
    return extendMileStoneTargetDate.targetDate;
  }
  formatDate(controlName, extendMileStoneTargetDate: MilestoneModel, startDate: Date) {
    switch (controlName) {
      case 'mileStoneCreationDate':
        extendMileStoneTargetDate.targetDate = new Date();
        let dateExtendion = new Date(startDate);
        extendMileStoneTargetDate.targetDate.setDate(dateExtendion.getDate() +  Number(extendMileStoneTargetDate.targetTime));
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
  changeDate(categoryType) {
    switch (categoryType) {
      case 'Minor':
        this.extendDate(30);
        break;
      case 'Major':
        this.extendDate(90);
        break;
      default: break;
    }
    this.editCFTRecord.cftCategoryType = categoryType;
  }




  showNoRecord(): boolean {
    if (this.filterData.length > 0) {
      return JSON.stringify(this.filterData).indexOf('"isMilestoneSelected":true') == -1;
    } else {
      return true;
    }

  }

  dummyData: Array<CFTMilestoneModel> = [
    {
      "id": 7,
      "department": "Assembly",
      "plant": "IB",
      "description": "details",
      "Milestones": [
        {
          "id": 7,
          "milestonename": "mTraining",
          "targettimeunit": "Days",
          "description": "test",
          "status": "Active",
          "targetTime": 56,

          "Dependency": {
            "id": 8,
            "milestonename": "Failed Parts",
            "targettimeunit": "Days",
            "description": "test",
            "status": "Inactive",
            "targetTime": 56
          },
          "isMilestoneSelected": null,
          "startDate": null,
          "targetDate": null,
          "empId": 7,
          "remarks": "Lakhvinder",

        },
        {
          "id": 7,
          "milestonename": "mTraining",
          "targettimeunit": "Days",
          "description": "test",
          "status": "Active",
          "targetTime": 56,

          "Dependency": {
            "id": 8,
            "milestonename": "mTraining",
            "targettimeunit": "Days",
            "description": "test",
            "status": "Inactive",
            "targetTime": 56
          },
          "isMilestoneSelected": null,
          "startDate": null,
          "targetDate": null,
          "empId": 8,
          "remarks": "Salesh",
        }
      ],
      "status": "Active"
    },
    {
      "id": 32,
      "department": "Production",
      "plant": "UB",
      "description": "PRODUCTION DETAILS",
      "Milestones": [
        {
          "id": 7,
          "milestonename": "mTraining",
          "targettimeunit": "Days",
          "description": "test",
          "status": "Inactive",
          "targetTime": 56,

          "Dependency": {
            "id": 8,
            "milestonename": "mTraining",
            "targettimeunit": "Days",
            "description": "test",
            "status": "Inactive",
            "targetTime": 56,

          },
          "isMilestoneSelected": null,
          "startDate": null,
          "targetDate": null,
          "empId": 9,
          "remarks": "Gaurav",
        },
        {
          "id": 7,
          "milestonename": "mTraining",
          "targettimeunit": "Days",
          "description": "test",
          "status": "Inactive",
          "targetTime": 56,

          "Dependency": {
            "id": 8,
            "milestonename": "mTraining",
            "targettimeunit": "Days",
            "description": "test",
            "status": "Inactive",
            "targetTime": 56
          },
          "isMilestoneSelected": null,
          "startDate": null,
          "targetDate": null,
          "empId": 9,
          "remarks": "Vipin",
        }
      ],
      "status": "ACTIVE"
    },
    {
      "id": 33,
      "department": "Design",
      "plant": "IB",
      "description": "TEST",
      "Milestones": [
        {
          "id": 7,
          "milestonename": "mTraining",
          "targettimeunit": "Days",
          "description": "test",
          "status": "Inactive",
          "targetTime": 56,

          "Dependency": {
            "id": 8,
            "milestonename": "mTraining",
            "targettimeunit": "Days",
            "description": "test",
            "status": "Inactive",
            "targetTime": 56
          }, "isMilestoneSelected": null,
          "startDate": null,
          "targetDate": null,
          "empId": 10,
          "remarks": "Rajat",
        },
        {
          "id": 7,
          "milestonename": "mTraining",
          "targettimeunit": "Days",
          "description": "test",
          "status": "Inactive",
          "targetTime": 56,

          "Dependency": {
            "id": 8,
            "milestonename": "mTraining",
            "targettimeunit": "Days",
            "description": "test",
            "status": "Inactive",
            "targetTime": 56
          }, "isMilestoneSelected": null,
          "startDate": null,
          "targetDate": null,
          "empId": 11,
          "remarks": "Rahul",
        }
      ],
      "status": "ACTIVE"
    },



    {
      "id": 33,
      "department": "Part Quality",
      "plant": "IB",
      "description": "TEST",
      "Milestones": [
        {
          "id": 7,
          "milestonename": "mTraining",
          "targettimeunit": "Days",
          "description": "test",
          "status": "Inactive",
          "targetTime": 56,

          "Dependency": {
            "id": 8,
            "milestonename": "mTraining",
            "targettimeunit": "Days",
            "description": "test",
            "status": "Inactive",
            "targetTime": 56
          }, "isMilestoneSelected": null,
          "startDate": null,
          "targetDate": null,
          "empId": 12,
          "remarks": "Sachin",

        },
        {
          "id": 7,
          "milestonename": "mTraining",
          "targettimeunit": "Days",
          "description": "test",
          "status": "Inactive",
          "targetTime": 56,
          "Dependency": {
            "id": 8,
            "milestonename": "mTraining",
            "targettimeunit": "Days",
            "description": "test",
            "status": "Inactive",
            "targetTime": 56
          }, "isMilestoneSelected": null,
          "startDate": null,
          "targetDate": null,
          "empId": 12,
          "remarks": "Ashish",
        }
      ],
      "status": "ACTIVE"
    },

    {
      "id": 33,
      "department": "process",
      "plant": "IB",
      "description": "TEST",
      "Milestones": [
        {
          "id": 7,
          "milestonename": "mTraining",
          "targettimeunit": "Days",
          "description": "test",
          "status": "Inactive",
          "targetTime": 56,
          "Dependency": {
            "id": 8,
            "milestonename": "mTraining",
            "targettimeunit": "Days",
            "description": "test",
            "status": "Inactive",
            "targetTime": 56
          }, "isMilestoneSelected": null,
          "startDate": null,
          "targetDate": null,
          "empId": 13,
          "remarks": "Chintu",
        },
        {
          "id": 7,
          "milestonename": "mTraining",
          "targettimeunit": "Days",
          "description": "test",
          "status": "Inactive",
          "targetTime": 56,
          "Dependency": {
            "id": 8,
            "milestonename": "mTraining",
            "targettimeunit": "Days",
            "description": "test",
            "status": "Inactive",
            "targetTime": 56
          }, "isMilestoneSelected": null,
          "startDate": null,
          "targetDate": null,
          "empId": 14,
          "remarks": "Raju",
        }
      ],
      "status": "ACTIVE"
    },



    {
      "id": 33,
      "department": "Field",
      "plant": "IB",
      "description": "TEST",
      "Milestones": [
        {
          "id": 7,
          "milestonename": "Failed Parts",
          "targettimeunit": "Days",
          "description": "test",
          "status": "Inactive",
          "targetTime": 56,
          "Dependency": {
            "id": 8,
            "milestonename": "Information",
            "targettimeunit": "Days",
            "description": "test",
            "status": "Inactive",
            "targetTime": 56
          }, "isMilestoneSelected": null,
          "startDate": null,
          "targetDate": null,
          "empId": 15,
          "remarks": "Atul"
        },
        {
          "id": 7,
          "milestonename": "mTraining",
          "targettimeunit": "Days",
          "description": "test",
          "status": "Inactive",
          "targetTime": 56,
          "Dependency": {
            "id": 8,
            "milestonename": "mTraining",
            "targettimeunit": "Days",
            "description": "test",
            "status": "Inactive",
            "targetTime": 56
          }, "isMilestoneSelected": null,
          "startDate": null,
          "targetDate": null,
          "empId": 16,
          "remarks": "Ajay",
        }
      ],
      "status": "ACTIVE"
    }
  ]

  dummyDepartmentData: Array<departmentModel> = [
    {
      "Id": 7,
      "department": "Assembly",
      "users": [{
        "empId": 7,
        "name": "Lakhvinder"
      },
      {
        "empId": 8,
        "name": "Salesh"
      }
      ],
      "status": "ACTIVE"
    },
    {
      "Id": 5,
      "department": "Field",
      "users": [{
        "empId": 10,
        "name": "Gaurav"
      },
      {
        "empId": 11,
        "name": "Vipin"
      }
      ],
      "status": "ACTIVE"
    },
    {
      "Id": 6,
      "department": "Production",
      "users": [{
        "empId": 11,
        "name": "Ashish"
      },
      {
        "empId": 11,
        "name": "Vipin"
      }
      ],
      "status": "ACTIVE"
    },
    {
      "Id": 6,
      "department": "Training",
      "users": [{
        "empId": 12,
        "name": "Ranjit"
      },
      {
        "empId": 13,
        "name": "Navdeep"
      }
      ],
      "status": "ACTIVE"
    }


  ]
}


