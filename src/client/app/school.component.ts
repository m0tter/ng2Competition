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

  constructor( private appService: AppService, private router: Router ) { }

  GetSchools(): void {
    this.appService.getSchools()
      .then(resp => this.schools = resp as school[])
      .catch(err => this.errorHandler(err));
  }

  SchoolSelect_Clicked($index: number) {
    this.schools[$index].selected = !this.schools[$index].selected;
    // this.CheckButtons();
  }

  btnNew_Clicked(): void {
    this.router.navigate(['/detail/0']);
  }

  ngOnInit() {
    this.GetSchools();
  }

  private errorHandler(error: any) {
    console.error('whoops it\'s all gone pear shaped');
  }
}

