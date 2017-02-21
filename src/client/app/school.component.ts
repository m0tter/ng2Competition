import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { School }             from 'ng2Competition';

import { AppService } from './app.service';

interface school extends School {
  selected: boolean;
}

@Component({
  selector: 'app-school',
  templateUrl: 'client/app/school.component.html',
  styleUrls: ['client/app/school.component.css']
})
export class SchoolComponent implements OnInit {
  private schools: school[];
  private editDisabled = true;
  private deleteDisabled = true;

  constructor( private appService: AppService, private router: Router ) { }

  getSchools(): void {
    this.appService.getSchools()
      .then(resp => this.schools = resp as school[])
      .catch(err => this.errorHandler(err));
  }

  schoolSelect_Clicked($index: number) {
    this.schools[$index].selected = !this.schools[$index].selected;
    this.checkButtons();
  }

  checkButtons(): void {
    this.editDisabled = true;
    this.deleteDisabled = true;

    let counter = this.schools.filter( school => school.selected === true).length

    if( counter === 1 ) this.editDisabled = false;
    if( counter > 0 ) this.deleteDisabled = false;
  }

  btnNew_Clicked(): void {
    this.router.navigate(['/detail/0']);
  }

  ngOnInit() {
    this.getSchools();
  }

  private errorHandler(error: any) {
    console.error('whoops it\'s all gone pear shaped');
  }
}

