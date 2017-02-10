import { Router, Request, Response }  from 'express';
import { School }                     from 'ng2Competition';
import * as bparser                   from 'body-parser';

import { SchoolModel, SchoolDocument } from '../models/school.model';

export class SchoolAPI {
  router = Router();

  constructor( ){
    this.buildRouter();
  }

  buildRouter() {
    this.router.get('/', ( req: Request, res: Response ) => {
      SchoolModel.find({'isCurrent': true}, (err: any, schools: School[]) => {
        if(err) this.errorHandler(err, res);
        else {
          if(schools) {
            res.status( 200 ).json({'success': true, data: schools});
          } else {
            res.status( 200 ).json({'success': true, data: null});
          }
        }
      });
    });

    this.router.post('/', bparser.json(), (req: Request, res: Response) => {
      var newSchool: SchoolDocument = new SchoolModel;
      var data:School = req.body;

      if( data ) {
        if( data.name )           newSchool.name          = data.name;
        if( data.contactEmail )   newSchool.contactEmail  = data.contactEmail;
        if( data.contactName )    newSchool.contactName   = data.contactName;
        if( data.contactNumber )  newSchool.contactNumber = data.contactNumber;
        if( data.isCurrent )      newSchool.isCurrent     = data.isCurrent;
        if( data.address )        newSchool.address       = data.address;
        newSchool.save((err, result) => {
          if( err ) this.errorHandler( err, res );
          else {
            res.status( 200 ).json({'success': true, data: result});
            console.log('I\'ve saved your data');
          }
        });
        console.log('I got here first');
      }
    });
  }

  static apiController(): Router {
    let schoolAPI = new SchoolAPI();
    return schoolAPI.router;
  }

  private errorHandler( err: any, res?: Response ){
    console.error('An error occurred in school.api', err.message || err);
    if( res )
      res.status( 500 ).json( {'success': false, 'data': err.message} );
  }
}