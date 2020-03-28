import { Component ,OnInit} from '@angular/core';
import { PageService } from './page.services';
/* import { Continent } from '../Continent';  */
/* import { Component, OnInit } from '@angular/core'; */
import { Router } from '@angular/router';
import { Page } from './page';
@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: './page.component.html',
})
/* export class FormLayoutsComponent {

}
 */
export class PageComponent implements OnInit {
  Page: Page = new Page();
  submitted = false;
  constructor(private PageService: PageService,
    private router: Router) {

     }

  ngOnInit() {
  }
  newPage(): void {
    this.submitted = false;
    this.Page = new Page();
  }

  save() {
    this.PageService.createPage(this.Page)
      .subscribe(data => console.log(data), error => console.log(error));
    this.Page = new Page();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/page.services']);
  }
}

