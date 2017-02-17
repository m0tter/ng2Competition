import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';

import { AppComponent }     from './app.component';
import { routing }          from './app.routing';

import { AppService }       from './app.service';

import { DashboardComponent }       from './dashboard.component';
import { SchoolComponent }          from './school.component';
import { SchoolDetailsComponent }   from './school-details.component';

@NgModule({
    imports: [ 
        BrowserModule, 
        FormsModule, 
        HttpModule, 
        routing 
    ],
    declarations: [ 
        AppComponent, 
        DashboardComponent, 
        SchoolComponent,
        SchoolDetailsComponent 
    ],
    providers: [ AppService ],
    bootstrap: [ AppComponent ]
})
export class AppModule{ }