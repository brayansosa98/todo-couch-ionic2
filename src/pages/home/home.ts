import { CouchbaseProvider } from './../../providers/person/person';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nombre:string;
  edad:number;

  constructor(public navCtrl: NavController, private couchPro: CouchbaseProvider) {
    
  }

  saveInfo() {

  }

}
