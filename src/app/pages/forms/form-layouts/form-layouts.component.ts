import { Component ,OnInit} from '@angular/core';
import { ContinentService } from './service';
/* import { Continent } from '../Continent';  */
/* import { Component, OnInit } from '@angular/core'; */
import { Router } from '@angular/router';
import { Continent} from './continent';
@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: './Continent.component.html',
})
/* export class FormLayoutsComponent {

}
 */
export class FormLayoutsComponent implements OnInit {
  Continent: Continent = new Continent();
  submitted = false;
  constructor(private ContinentService: ContinentService,
    private router: Router) {

     }

  ngOnInit() {
  }
  newContinent(): void {
    this.submitted = false;
    this.Continent = new Continent();
  }

  save() {
    this.ContinentService.createContinent(this.Continent)
      .subscribe(data => console.log(data), error => console.log(error));
    this.Continent = new Continent();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/Continent']);
  }
}

