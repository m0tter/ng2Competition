import { Component, OnInit }  from '@angular/core';
import { School }             from 'ng2Competition';

import { AppService } from './app.service';


@Component({
  selector: 'app-school',
  templateUrl: 'client/app/school.component.html'
})
export class SchoolComponent implements OnInit {
  private schools: School[];

  constructor( private appService: AppService ) { }

  GetSchools(): void {
    this.appService.getSchools()
      .then(resp => this.schools = resp as School[])
      .catch(err => this.errorHandler(err));
  }

  ngOnInit() {
    this.GetSchools();
  }

  private errorHandler(error: any) {
    console.error('whoops it\'s all gone pear shaped');
  }
}

