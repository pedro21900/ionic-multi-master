import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sm-equino-card-lg',
  templateUrl: './equino-card-lg.component.html',
  styleUrls: ['./equino-card-lg.component.scss'],
})
export class EquinoCardLgComponent implements OnInit {

  @Input() data: any;

  @Output() onEditClick = new EventEmitter();

  @Output() onDeleteClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}
