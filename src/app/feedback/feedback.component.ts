import { Component, OnInit } from '@angular/core';
import {IFeedback} from '../shared/models/models';
import {ProviderService} from '../shared/services/provider.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbacks: IFeedback[] = [];
  constructor(private router: Router, private provider: ProviderService) { }

  ngOnInit() {
    this.provider.getFeedback(JSON.parse(localStorage.getItem('currentGym'))).then( res => {
      this.feedbacks = res;
    });
  }

}
