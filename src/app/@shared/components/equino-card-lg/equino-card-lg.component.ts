import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Equino} from '../../../domain/equino';
import {from, Observable} from 'rxjs';
import {Especie} from '../../../domain/especie';
import {Raca} from '../../../domain/raca';
import {RacaRepository} from '../../../repositories/raca.repository';
import {EspecieRepository} from '../../../repositories/especie.repository';
import {VwEquino} from '../../../pages/equino/equino-list/equino-list-page.component';

@Component({
  selector: 'sm-equino-card-lg',
  templateUrl: './equino-card-lg.component.html',
  styleUrls: ['./equino-card-lg.component.scss'],
})
export class EquinoCardLgComponent implements OnInit {

  @Input() data: VwEquino;

  @Output() onEditClick = new EventEmitter();

  @Output() onDeleteClick = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

}
