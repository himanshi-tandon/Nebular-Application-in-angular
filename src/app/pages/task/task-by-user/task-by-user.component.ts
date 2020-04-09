import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageTaskService } from '../../../services/manage-task.service';
import { TaskByUserModel, PostNewRemarkForTask } from '../../../@core/models/task-by-user.model';
import { NbDialogService } from '@nebular/theme';
import { MilestoneModel } from '../../../@core/models/cftmilestones.model';

import { UserModel } from '../../../@core/models/department.model';




@Component({
  selector: 'ngx-task-by-user',
  templateUrl: './task-by-user.component.html',
  styleUrls: ['./task-by-user.component.scss']
})
export class TaskByUserComponent implements OnInit {

  public statusremarks = [{ name: 'Assigned' }, { name: 'InProgress' }, { name: 'Completed' }, { name: 'Closed' }]
  taskByUserList: TaskByUserModel[] = [];
  userdetails: UserModel = new UserModel();

  searchTerm: string;
  constructor(private dialogService: NbDialogService, private activeRoute: ActivatedRoute, private router: Router, private manageTaskService: ManageTaskService) {
    localStorage.setItem('User', '{"id": 7,"empid": "CM","name": "himanshi","designation": null,"email": null,"phone": null,"role": null,"reporting": null, "department": null,"country": null,"plant": null, "description": null, "status": null}');
  }


  ngOnInit() {
    this.userdetails = JSON.parse(localStorage.getItem('User'));

    this.BindData();
  }
  BindData() {

    if (this.userdetails) {
      this.manageTaskService.getTaskByUser(Number(this.userdetails.id)).subscribe(Data => {
        this.taskByUserList = Data;
        this.taskByUserList.map(s => s.cftMileStoneData.map(d => d.milestones.map(e => e.remarks = [{ remarktext: '', createddate: new Date() }])))
      })
    }
  }
  // remarksList:CFTRemarksModel[]=[];
  // open(dialog: TemplateRef<any>,item:CFTMilestoneModel) {
  //   console.log(item)
  //   this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });

  // }
  saveRemarks(item: MilestoneModel, department: string) {
    console.log(item);
    var postData = new PostNewRemarkForTask();
    postData.id = item.id.toString();
    postData.cftNo = this.taskByUserList[0].cftNo == null || "" ? "CFT No. does not exist" : this.taskByUserList[0].cftNo;
    postData.department = department;
    postData.milestonename = item.milestonename;
    postData.scrNo = this.taskByUserList[0].scrNo;
    postData.status = item.status;
    postData.remarks = item.remarks[0];
    postData.remarks.createddate = new Date();
    postData.remarks.empid = this.userdetails.empid;
    postData.remarks.name = this.userdetails.name;
    console.log(postData);
    this.manageTaskService.postSaveRemarks(postData).subscribe(Data => {
      this.BindData();
      // this.router.navigateByUrl('/task/task-by-user', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['/task/task-by-user']);
      // });
      //this.router.navigate(['../view-cft'], { relativeTo: this.activeRoute });
    });
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
