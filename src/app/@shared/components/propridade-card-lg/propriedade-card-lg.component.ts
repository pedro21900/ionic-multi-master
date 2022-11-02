import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sm-propriedade-card-lg',
  templateUrl: './propriedade-card-lg.component.html',
  styleUrls: ['./propriedade-card-lg.component.scss'],
})
export class PropriedadeCardLgComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {}

}
