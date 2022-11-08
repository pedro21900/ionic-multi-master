import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-connect',
  templateUrl: './no-connect.component.html',
  styleUrls: ['./no-connect.component.scss'],
})
export class NoConnectComponent implements OnInit {

  @Input() item: any;
  
  constructor() { }

  ngOnInit() {}

}
