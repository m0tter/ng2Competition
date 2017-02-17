import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { School } from 'ng2Competition';
import { AppService } from './app.service';

@Component({
  selector: 'school-details',
  templateUrl: 'client/app/school-details.component.html',
  styleUrls: ['client/app/school-details.component.css']
})
export class SchoolDetailsComponent implements OnInit {
  private school:School;

  constructor( 
    private appService: AppService,
    private route: ActivatedRoute,
    private location: Location 
  ) { }

  goBack(): void {
    this.location.back();
  }

  btnCancel_Clicked(): void {
    this.goBack();
  }

  btnSave_Clicked(): void {
    this.appService.newSchool(this.school)
      .then( resp => { this.goBack(); })
  }

  ngOnInit(): void { 
    if(this.route.params['id']){
      this.route.params
        .switchMap((params: Params) => this.appService.getSchool(params['id']))
        .subscribe(school => this.school = <School>school);
    } else {
      this.school = { 
        name: '', 
        contactEmail: '',
        contactName: '',
        contactNumber: '',
        _id: '',
        address: '',
        isCurrent: true
      }
    }
  }
}