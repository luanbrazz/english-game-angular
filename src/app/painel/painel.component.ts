import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
})
export class PainelComponent implements OnInit, OnDestroy {
  public frases: Frase[] = FRASES;
  public instrucao: string = 'Traduza a frase';
  resposta: string = '';

  rodada: number = 0;
  rodadaFrase!: Frase;

  progresso: number = 0;

  public tentativas: number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaRodada();
  }

  ngOnDestroy(): void {
    // console.log('componente destruido');
  }

  ngOnInit(): void {}

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  verificarResposta() {
    if (this.rodadaFrase.frasePtBr == this.resposta) {
      // alert('A tradução está correta! Parabéns :)');

      // trocar pergunta da rodada
      this.rodada++;

      this.progresso = this.progresso + 100 / this.frases.length;

      //
      if (this.rodada === this.frases.length) {
        // alert('Concluiu as respostas com sucesso!');
        this.encerrarJogo.emit('vitoria');
      }

      // atualiza obj radadaFrase
      this.atualizaRodada();
    } else {
      alert('Infelizmente você errou! :(');
      // limpar
      this.resposta = '';

      // diminuir variavel tentativas
      this.tentativas--;

      if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota');
        // alert('Você perdeu todas as tentativas!');
        // this.recarregarPagina();
      }
    }
  }

  atualizaRodada() {
    this.rodadaFrase = this.frases[this.rodada];
    // limpar
    this.resposta = '';
  }

  recarregarPagina(): void {
    window.location.replace(window.location.href);
  }
}
