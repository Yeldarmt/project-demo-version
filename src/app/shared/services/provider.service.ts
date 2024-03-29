import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MainService} from './main.service';
import {IAuthResponse, IGym, ICoach, IClient, IFeedback, ISubscription, ITest, IAbout} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {
  public logged = false;
  public gymClicked = false;
  public curGym: IGym;
  public curCoach: ICoach;
  constructor(http: HttpClient) {
    super(http);
  }
  getGyms(): Promise<IGym[]> {
    return this.get('http://localhost:8000/api/gym_lists/', {});
  }
  getCoaches(gym: IGym): Promise<ICoach[]> {
    return this.get(`http://localhost:8000/api/gym_lists/${gym.id}/coach_list/`, {});
  }
  getClients(gid: number): Promise<IClient[]> {
    return this.get(`http://localhost:8000/api/gym_lists/${gid}/client_list/`, {});
  }
  // getCoachInfo(gym: IGym, coach: ICoach): Promise<ICoach> {
  //   return this.get(`http://localhost:8000/api/gym_lists/${gym.id}/coach_list/${coach.id}/`, {});
  // }
  auth(uname: string, pword: string): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: uname,
      password: pword
    });
  }
  logout(): Promise<any> {
    return this.post(`http://localhost:8000/api/logout/`, {});
    this.logged = false;
  }
  getAbout(): Promise<IAbout[]> {
    return this.get('http://localhost:8000/api/about/', {});
  }

  getFeedback(gym: IGym): Promise<IFeedback[]> {
    return this.get(`http://localhost:8000/api/gym_lists/${gym.id}/feedback/`, {});
  }
  createClient(gymId: number, n: string, s: string, u: string, p: string, e: string, ph: string, st: string): Promise <IClient> {
    return this.post(`http://localhost:8000/api/gym_lists/${gymId}/client_list/`, {
      name: n,
      surname: s,
      username: u,
      password: p,
      email: e,
      phone: ph,
      status: st,
      gym_id: gymId
    });
  }
}
