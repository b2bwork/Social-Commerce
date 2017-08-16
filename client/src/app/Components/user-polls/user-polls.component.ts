import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'user-polls',
  templateUrl: './user-polls.component.html',
  styleUrls: ['./user-polls.component.css']
})
export class UserPollsComponent implements OnInit {
@Input() polls: any;

  constructor() { }

  ngOnInit() {
  }

}
