import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Equino} from '../../../domain/equino';
import {from, Observable} from 'rxjs';
import {Especie} from '../../../domain/especie';
import {Raca} from '../../../domain/raca';
import {RacaRepository} from '../../../repositories/raca.repository';
import {EspecieRepository} from '../../../repositories/especie.repository';

@Component({
  selector: 'sm-equino-card-lg',
  templateUrl: './equino-card-lg.component.html',
  styleUrls: ['./equino-card-lg.component.scss'],
})
export class EquinoCardLgComponent implements OnInit {

  @Input() data: Equino;

  @Output() onEditClick = new EventEmitter();

  @Output() onDeleteClick = new EventEmitter();

  especie:string;

  raca:string;

  constructor(private racaProvider:RacaRepository,
              private especieProvider:EspecieRepository) { }

  ngOnInit() {
   from(this.especieProvider.findById(this.data.cdEspecie)).subscribe((especie:Especie)=>this.especie=especie.dsEspecie);
    from(this.racaProvider.findById(this.data.cdRaca)).subscribe((raca:Raca)=>this.raca=raca.dsRaca);
  }

}
