import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Equino} from '../../../domain/equino';

@Component({
  selector: 'sm-equino-card-lg',
  templateUrl: './equino-card-lg.component.html',
  styleUrls: ['./equino-card-lg.component.scss'],
})
export class EquinoCardLgComponent implements OnInit {

  @Input() data: Equino;

  @Output() onEditClick = new EventEmitter();

  @Output() onDeleteClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}
