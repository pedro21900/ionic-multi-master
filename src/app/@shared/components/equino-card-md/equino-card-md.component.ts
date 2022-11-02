import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sm-equino-card-md',
  templateUrl: './equino-card-md.component.html',
  styleUrls: ['./equino-card-md.component.scss'],
})
export class EquinoCardMdComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {}

}
