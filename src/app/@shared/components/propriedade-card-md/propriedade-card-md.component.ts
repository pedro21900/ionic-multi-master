import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sm-propriedade-card-md',
  templateUrl: './propriedade-card-md.component.html',
  styleUrls: ['./propriedade-card-md.component.scss'],
})
export class PropriedadeCardMdComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {}

}
