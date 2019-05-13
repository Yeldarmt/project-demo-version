import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProviderService} from '../shared/services/provider.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // logged: boolean;
  gymClicked: boolean;
  login: boolean;
  registered: boolean;
  username: string;
  password: string;
  password2: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  status: string;
  authlogin: boolean;
  constructor(private router: Router, private provider: ProviderService) {
  }

  ngOnInit() {
    // this.logged = this.provider.logged;
    this.gymClicked = JSON.parse(localStorage.getItem('gymClicked'));
    this.registered = false;
    this.username = '';
    this.password = '';
    this.password2 = '';
    this.name = '';
    this.surname = '';
    this.email = '';
    this.phone = '';
    this.status = '';
    // localStorage.setItem('login', 'false');
    // this.login = JSON.parse(localStorage.getItem('login'));
  }
  x() {
    this.authlogin = false;
    this.registered = false;
  }

  getAbout() {
    this.router.navigate([{outlets: {primary: 'about'}}]);
  }
  auth() {
    // if (this.username === '') {
    //   alert('Error');
    // } else {
    //   console.log('else');
    // }
    if (this.username !== '' && this.password !== '') {
      this.provider.auth(this.username, this.password).then(res => {
        localStorage.setItem('token', res.token);
        console.log(localStorage.getItem('token'));
      });
      localStorage.setItem('login', 'true');
      this.login = JSON.parse(localStorage.getItem('login'));
      console.log('OK');
      this.router.navigate([{outlets: {primary: 'main' , header: 'header2'}}]);
      this.authlogin = false;
    } else {
      alert('Заполните все поля!');
    }
  }
  reg() {
    this.registered = true;
  }
  register() {
    if (this.username !== '' && this.password !== '' && this.name !== '' && this.surname !== '') {
      if (this.password2 !== '' && this.email !== '' && this.phone !== '' && this.status !== '') {
        if (this.password === this.password2) {
          console.log('registered' + this.password + this.password2);
          this.provider.createClient(1, this.name, this.surname, this.username,
            this.password, this.email, this.phone, this.status).then( res => {
            console.log('Client created');
            this.provider.auth(this.username, this.password).then(ress => {
              localStorage.setItem('token', ress.token);
              console.log(localStorage.getItem('token'));
            });
            localStorage.setItem('login', 'true');
            this.login = JSON.parse(localStorage.getItem('login'));
            console.log('OK');
            this.router.navigate([{outlets: {primary: 'main' , header: 'header2'}}]);
            this.authlogin = false;
          });
        } else {
          alert('You write two different password');
        }
      } else {
        alert('Заполните все поля!');
      }
    } else {
      alert('Заполните все поля!');
    }
  }
  log() {
    if (JSON.parse(localStorage.getItem('login')) === true) {
      alert('You already logged');
    } else {
      this.authlogin = true;
      //   localStorage.setItem('login', 'true');
      //   this.login = JSON.parse(localStorage.getItem('login'));
    }
  }
}
