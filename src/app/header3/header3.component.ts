import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProviderService} from '../shared/services/provider.service';

@Component({
  selector: 'app-header3',
  templateUrl: './header3.component.html',
  styleUrls: ['./header3.component.css']
})
export class Header3Component implements OnInit {

  constructor(private router: Router, private provider: ProviderService) { }

  ngOnInit() {
  }
  getFeedback() {
    this.router.navigate([{outlets: {primary: 'feedback'}}]);
  }

  club() {
    localStorage.setItem('gymClicked', 'false');
    localStorage.removeItem('currentGym');
    this.router.navigate([{outlets: {primary: 'main', header: 'header2'}}]);
  }

  trener() {
    this.router.navigate([{outlets: {primary: 'coach'}}]);
  }
  logout() {
    this.provider.logout().then( res => {
      localStorage.clear();
      this.provider.logged = false;
    });
    this.router.navigate([{outlets: {primary: 'login', header: 'header'}}]);
  }
}
