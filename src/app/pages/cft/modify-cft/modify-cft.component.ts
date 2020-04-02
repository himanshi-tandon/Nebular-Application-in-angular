import { Component, OnInit, SimpleChange } from '@angular/core';
import { ManageCftService } from '../../../services/manage-cft.service';
import { CFTDetailsModel } from '../../../@core/models/cftdetails.model';
import { NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { CFTMilestoneModel, MilestoneModel } from '../../../@core/models/cftmilestones.model';
import { departmentModel } from '../../../@core/models/department.model';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'ngx-modify-cft',
  templateUrl: './modify-cft.component.html',
  styleUrls: ['./modify-cft.component.scss']
})

export class ModifyCftComponent implements OnInit {
  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  totalEstimate = 10;
  ctx = { estimate: this.totalEstimate };
  today: number = Date.now();
  editCFTRecord: CFTDetailsModel = new CFTDetailsModel();
  departmentData: Array<departmentModel> = [];
  filteredmilestone: Array<departmentModel> = [];

  constructor(private activeRoute: ActivatedRoute, private router: Router, private manageCFTService: ManageCftService, private dialogService: NbDialogService) { }

  Cancel() {
    this.router.navigate(['../view-cft'], { relativeTo: this.activeRoute });
  }
  reload() {
    this.router.navigate(['../view-cft']);
  }


  milestonedetails() {
    console.log(this.dummyData);

  }


  ngOnInit() {
    this.loadDepartmentData();
    console.log(this.dummyData);

    this.manageCFTService.cftRecord.subscribe(item => {
      // if (Object.keys(item).length === 0) 
      // {
      //   this.router.navigate(['../view-cft'], { relativeTo: this.activeRoute });
      // }
      this.editCFTRecord = item;

      this.extendDate(30);

    })
  }

  filterData: CFTMilestoneModel[];
  onChangeDepartment(e: departmentModel[]) {
    this.filterData = this.dummyData.filter((filtemilestone) => {
      if (e.filter((milestonedata) => {
        if (milestonedata.Name.toLowerCase() == filtemilestone.department.toLowerCase()) {
          return milestonedata
        }
      }).length > 0) {
        return filtemilestone;
      }
    });

  }

  extendDate(nofdays) {
    this.editCFTRecord.targetDate = new Date().toDateString();
    let nofdaystoextend = new Date(this.editCFTRecord.targetDate);
    nofdaystoextend.setDate(nofdaystoextend.getDate() + nofdays);
    this.editCFTRecord.targetDate = nofdaystoextend.toDateString();
  }

  extendMileStoneTargetDate(nofdays,startDate):string {
    let nofdaystoextend = new Date(startDate);
    nofdaystoextend.setDate(nofdaystoextend.getDate() + nofdays);
    return nofdaystoextend.toDateString();
   // this.editCFTRecord.targetDate = nofdaystoextend.toDateString();
  }

  changeDate(categoryType) {
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

  loadDepartmentData() {
    this.departmentData.push({ 'Id': 1, 'Name': 'Assembly' });
    this.departmentData.push({ 'Id': 2, 'Name': 'Production' });
    this.departmentData.push({ 'Id': 3, 'Name': 'Design' });
    this.departmentData.push({ 'Id': 4, 'Name': 'Part Quality' });
    this.departmentData.push({ 'Id': 5, 'Name': 'Process' });
    this.departmentData.push({ 'Id': 6, 'Name': 'Field' });


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
          "startDate":null
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
          "startDate":null
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
            "targetTime": 56
          },
          "isMilestoneSelected": null,
          "startDate":null
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
          "startDate":null
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
          "startDate":null
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
          "startDate":null
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
          "startDate":null
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
          "startDate":null
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
          "startDate":null
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
          "startDate":null
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
          "startDate":null
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
          "startDate":null
        }
      ],
      "status": "ACTIVE"
    }
  ]


}


