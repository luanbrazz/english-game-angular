import { Coracao } from './../shared/coracao.model';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css'],
})
export class TentativasComponent implements OnInit, OnChanges {
  @Input() public tentativas!: number;

  coracoes: Coracao[] = [
    new Coracao(true),
    new Coracao(true),
    new Coracao(true),
  ];

  constructor() {
    // console.log(this.coracoes);
  }

  ngOnChanges(): void {
    // console.log(this.tentativas, 'this.tentativas');

    if (this.tentativas !== this.coracoes.length) {
      let indice = this.coracoes.length - this.tentativas;

      this.coracoes[indice - 1].cheio = false;
    }
  }

  ngOnInit(): void {}
}
