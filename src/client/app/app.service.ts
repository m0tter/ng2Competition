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

  private errorHandler(error: any): Promise<any> {
    console.error('Error occurred in AppService: ', error.message || error);
    return Promise.reject(error.message || error);
  }

}