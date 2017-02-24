import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { School } from 'ng2Competition';

@Injectable()
export class AppService {
  private schoolAPI = '/api/schools/';

  constructor( private http: Http ){ }

  getSchools(): Promise<School[]> {
    return this.http.get(this.schoolAPI)
      .toPromise()
      .then( resp => resp.json().data as School[] )
      .catch( err => this.errorHandler( err ));
  }

  getSchool(id: string): Promise<School> {
    return this.getSchools()
      .then(schools => schools.find(school => school._id === id));
  }

  newSchool(school: School): Promise<School> {
    return this.http.post(this.schoolAPI, school)
      .toPromise()
      .then( resp => resp.json().data as School )
      .catch( err => this.errorHandler( err ));
  }

  deleteSchool(school: School): Promise<boolean> {
    return this.http.delete( this.schoolAPI + school._id )
      .toPromise()
      .then( resp => {
        if( resp.json().data === school._id ) return true; else return false;
      })
      .catch( err => this.errorHandler( err ));
  }

  private errorHandler(error: any): Promise<any> {
    console.error('Error occurred in AppService: ', error.message || error);
    return Promise.reject(error.message || error);
  }

}