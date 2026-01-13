import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  ViewChild,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { transition, trigger, useAnimation } from '@angular/animations';
import { bounceIn, fadeIn } from 'ng-animate';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ContatoService } from '../../services/contatos/contatos.service';
import { HttpClientModule } from '@angular/common/http';
import { WebHookService } from '../../services/webhook/webhook.service';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { RodapeComponent } from '../rodape/rodape.component';
import { ActivatedRoute } from '@angular/router';

register();

@Component({
  selector: 'front-zapfarma-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './home.component.contato.scss', './wp-lite.css', './style9030.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatIconModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ToolbarComponent,
    RodapeComponent,
    HttpClientModule,
  ],
  animations: [
    trigger('myAnimation0', [transition('* => *', useAnimation(fadeIn))]),
    trigger('myAnimation1', [transition('* => *', useAnimation(bounceIn))]),
  ],
  providers: [provideNgxMask(), ContatoService, WebHookService],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  formulario!: FormGroup;
  calcForm!: FormGroup;

  conversaoAtual: number | null = null;
  faturamentoAtual: number | null = null;
  conversaoZapfarma: number | null = null;
  faturamentoZapfarma: number | null = null;
  crescimento: number | null = null;
  mostraResultado = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.calcForm = this.fb.group({
      pedidos: [''],
      vendas: [''],
      ticket: [''],
    });
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nomeFarmacia: new FormControl('', Validators.required),
      contato: new FormControl('', Validators.required),
      emailContato: new FormControl('', [Validators.email]),
      mensagem: new FormControl('', Validators.required),
    });

    this.calcForm = new FormGroup({
      pedidos: new FormControl('', Validators.required),
      vendas: new FormControl('', Validators.required),
      ticket: new FormControl('', Validators.required),
    });

    // Scroll para fragment se houver hash na URL
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  }

  onTicketInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    value = (parseInt(value, 10) / 100).toFixed(2);
    value = value.replace('.', ',');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    event.target.value = value;
    this.calcForm.get('ticket')?.setValue(event.target.value, { emitEvent: false });
  }

  calcular() {
    let pedidos = Number(this.calcForm.value.pedidos);
    let vendas = Number(this.calcForm.value.vendas);

    pedidos = pedidos * 30;
    vendas = vendas * 30;

    let ticketStr = this.calcForm.value.ticket || '';
    ticketStr = ticketStr.replace(/\./g, '').replace(',', '.');
    const ticket = Number(ticketStr);

    if (!pedidos || !vendas || !ticket) {
      this.conversaoAtual = null;
      this.faturamentoAtual = null;
      this.conversaoZapfarma = null;
      this.faturamentoZapfarma = null;
      this.crescimento = null;
      this.mostraResultado = true;
      return;
    }

    this.conversaoAtual = pedidos > 0 ? (vendas / pedidos) * 100 : 0;
    this.faturamentoAtual = vendas * ticket;
    this.conversaoZapfarma = this.conversaoAtual + 15;
    this.faturamentoZapfarma = pedidos * (this.conversaoZapfarma / 100) * ticket;
    this.crescimento = this.faturamentoZapfarma - this.faturamentoAtual;
    this.mostraResultado = true;
  }

  enviarFormulario(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
    } else {
      const nomeFarmacia = this.formulario.get('nomeFarmacia')?.value;
      const contato = this.formulario.get('contato')?.value;
      const emailContato = this.formulario.get('emailContato')?.value;

      const mensagem = `Olá, eu sou *${nomeFarmacia}*, %0AEstou acessando o site da Zapfarma e gostaria de mais informações, seguem meus dados:%0A%0A*Contato*:%0A${contato}%0A*Email de contato:*%0A${emailContato}`;

      const linkWhatsApp = `https://wa.me/552135205492?text=${mensagem}`;
      window.open(linkWhatsApp, '_blank');
    }
  }

  enviarWhatsapp(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const nome = this.formulario.get('nomeFarmacia')?.value;
    const contato = this.formulario.get('contato')?.value;
    const mensagemExtra = this.formulario.get('mensagem')?.value || '';
    const texto = encodeURIComponent(
      `Olá, sou ${nome}.\nTelefone: ${contato}\n${mensagemExtra}`
    );
    const linkWhatsApp = `https://wa.me/5521964276919?text=${texto}`;
    window.open(linkWhatsApp, '_blank');
  }
}
