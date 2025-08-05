import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  ViewChild,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceIn,
  fadeIn,
} from 'ng-animate';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ContatoService } from '../../services/contatos/contatos.service';
import {
  HttpClient,
} from '@angular/common/http';
import { WebHookService } from '../../services/webhook/webhook.service';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';

// const CepDistance  = inport "cep-distance";
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { FormControl } from '@angular/forms';

register();

@Component({
  selector: 'front-zapfarma-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './wp-lite.css', './style9030.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatIconModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    ToolbarComponent,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  animations: [
    trigger('myAnimation0', [transition('* => *', useAnimation(fadeIn))]),
    trigger('myAnimation1', [transition('* => *', useAnimation(bounceIn))]),
  ],
  providers: [provideNgxMask(), ContatoService, WebHookService, HttpClient],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  formulario!: FormGroup;

  bounce: any;
  ngOnInit(): void {
    this.formulario = new FormGroup({
      nomeFarmacia: new FormControl('', Validators.required),
      contato: new FormControl('', Validators.required),
      whatsappDelivery: new FormControl('', Validators.required),
      emailContato: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      enderecoFarmacia: new FormControl('', Validators.required),
    });
  }

  enviarFormulario(): void {
    if (this.formulario.invalid) {
    this.formulario.markAllAsTouched();
    }else {
      const nomeFarmacia = this.formulario.get('nomeFarmacia')?.value;
      const contato = this.formulario.get('contato')?.value;
      const whatsappDelivery = this.formulario.get('whatsappDelivery')?.value;
      const emailContato = this.formulario.get('emailContato')?.value;
      const enderecoFarmacia = this.formulario.get('enderecoFarmacia')?.value;

      const mensagem = `Olá, eu sou *${nomeFarmacia}*, %0AEstou acessando o site da Zapfarma e gostaria de mais informações, seguem meus dados:%0A%0A*Contato*:%0A${contato}%0A*WhatsApp do delivery:*%0A${whatsappDelivery}%0A*Email de contato:*%0A${emailContato}%0A*Endereço da farmácia:*%0A${enderecoFarmacia}`;
      const linkWhatsApp = `https://wa.me/5521984384352?text=${mensagem}`;

      window.open(linkWhatsApp, '_blank');
    }
  }
}

