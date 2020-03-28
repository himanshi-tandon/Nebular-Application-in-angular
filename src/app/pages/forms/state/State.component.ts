import { Component ,OnInit} from '@angular/core';
import { StateService } from './state.services';
/* import { Continent } from '../Continent';  */
/* import { Component, OnInit } from '@angular/core'; */
import { Router } from '@angular/router';
import { State } from './states';
@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: './state.component.html',
})
/* export class FormLayoutsComponent {

}
 */
export class StateComponent implements OnInit {
  State: State = new State();
  submitted = false;
  constructor(private StateService: StateService,
    private router: Router) {

     }

  ngOnInit() {
  }
  newState(): void {
    this.submitted = false;
    this.State = new State();
  }

  save() {
    this.StateService.createState(this.State)
      .subscribe(data => console.log(data), error => console.log(error));
    this.State = new State();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/state.services']);
  }
}

