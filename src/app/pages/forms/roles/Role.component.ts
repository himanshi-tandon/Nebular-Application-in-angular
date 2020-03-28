import { Component ,OnInit} from '@angular/core';
import { RoleService } from './role.services';
/* import { Continent } from '../Continent';  */
/* import { Component, OnInit } from '@angular/core'; */
import { Router } from '@angular/router';
import { Role } from './role';
@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: './role.component.html',
})
/* export class FormLayoutsComponent {

}
 */
export class RoleComponent implements OnInit {
  Role: Role = new Role();
  submitted = false;
  constructor(private RoleService: RoleService,
    private router: Router) {

     }

  ngOnInit() {
  }
  newRole(): void {
    this.submitted = false;
    this.Role = new Role();
  }

  save() {
    this.RoleService.createRole(this.Role)
      .subscribe(data => console.log(data), error => console.log(error));
    this.Role = new Role();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/role.services']);
  }
}

