import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sm-equino-card-lg',
  templateUrl: './equino-card-lg.component.html',
  styleUrls: ['./equino-card-lg.component.scss'],
})
export class EquinoCardLgComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {}

}
