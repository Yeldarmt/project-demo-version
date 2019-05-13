import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProviderService} from '../shared/services/provider.service';
import {IClient, IGym} from '../shared/models/models';

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
  asAdmin: boolean;
  asClient: boolean;
  username: string;
  password: string;
  password2: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  status: string;
  authlogin: boolean;
  selectedGym: IGym;
  clients: IClient[] = [];
  gymId: number;
  gyms: IGym[] = [];
  constructor(private router: Router, private provider: ProviderService) {
  }

  ngOnInit() {
    // this.logged = this.provider.logged;
    this.provider.getGyms().then( res => {
      this.gyms = res;
      console.log(this.gyms);
    });
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
    if (this.asClient === true) {
      if (this.asAdmin === true) {
        alert('Choose only one type of user!!!');
      } else {
        console.log('Client');
        if (this.username !== '' && this.password !== '') {
          this.provider.getClients(1).then( res => {
            this.clients = res;
            console.log(this.clients);
          });
          for (const c of this.clients) {
            if (this.username === c.username && this.password === c.password) {
                localStorage.setItem('loggedAsClient', 'true');
                localStorage.setItem('login', 'true');
                console.log('Client logged');
                console.log(c.username);
                this.router.navigate([{outlets: {primary: 'main' , header: 'header2'}}]);
                this.authlogin = false;
                break;
            }// else {
            //   alert('Invalid login or password');
            // }
          }
        } else {
          alert('Заполните все поля!');
        }
      }
    } else {
      console.log('Admin');
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
  }
  // onChange(event) {
  //   const newVal = JSON.parse(event.target.value);
  //   console.log(newVal.name);
  // }
  reg() {
    this.registered = true;
  }
  register() {
    if (this.username !== '' && this.password !== '' && this.name !== '' && this.surname !== '') {
      if (this.password2 !== '' && this.email !== '' && this.phone !== '' && this.status !== '') {
        if (this.password === this.password2) {
          console.log('registered' + this.password + this.password2);
          this.provider.createClient(this.gymId, this.name, this.surname, this.username,
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
