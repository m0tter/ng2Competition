import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<h3>Hello {{name}}</h3>
        <input type="password" [(ngModel)]="name">
        <button type="button" (click)="btnCheck_Click()">Check</button>
        <br><br>{{result}}
    `
})
export class AppComponent {
    name:string = "Dave";
    result:string;

    btnCheck_Click() {
        if(this.name === "Warren") this.result = "You're a legend Warren"; else this.result = "You're not a legend " + this.name;
    }

}