import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProviderService} from "../shared/services/provider.service";
import {ICoach} from "../shared/models/models";

@Component({
  selector: 'app-coachinfo',
  templateUrl: './coachinfo.component.html',
  styleUrls: ['./coachinfo.component.css']
})
export class CoachinfoComponent implements OnInit {
  currentCoach: ICoach;

  constructor(private router: Router, private provider: ProviderService) { }

  ngOnInit() {
    this.currentCoach = JSON.parse(localStorage.getItem('currentCoach'));
  }

}
