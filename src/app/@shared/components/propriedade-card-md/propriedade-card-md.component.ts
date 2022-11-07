import { Component, OnInit, Input } from '@angular/core';
import {ExploracaoPecuariaEquideo} from '../../../domain/exploracao-pecuaria-equideos';

@Component({
  selector: 'sm-propriedade-card-md',
  templateUrl: './propriedade-card-md.component.html',
  styleUrls: ['./propriedade-card-md.component.scss'],
})
export class PropriedadeCardMdComponent implements OnInit {

  @Input() data: ExploracaoPecuariaEquideo;

  constructor() { }

  ngOnInit() {}

}
