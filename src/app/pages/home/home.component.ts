import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  ViewChild,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper';

import { frontZapFarmaHeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  backOutDown,
  backOutUp,
  bounce,
  bounceIn,
  fadeIn,
  flash,
} from 'ng-animate';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ContatoService } from '../../services/contatos/contatos.service';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { WebHookService } from '../../services/webhook/webhook.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { frontZapFarmaMenuComponent } from 'src/app/shared/menu/menu.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { PlanosAssinaturasComponent } from 'src/app/shared/planos-assinaturas/planos-assinaturas.component';

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
    frontZapFarmaMenuComponent,
    frontZapFarmaHeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NgxMaskDirective,
    HttpClientModule,
    ToolbarComponent,
    PlanosAssinaturasComponent
  ],
  animations: [
    trigger('myAnimation0', [transition('* => *', useAnimation(fadeIn))]),
    trigger('myAnimation1', [transition('* => *', useAnimation(bounceIn))]),
  ],
  providers: [provideNgxMask(), ContatoService, WebHookService, HttpClient],
})
export class HomeComponent implements OnInit {
  formSendData!: FormGroup;
  isSubmit = false;
  isValidForm = false;
  animate0 = false;
  animate1 = false;
  animate2 = false;
  animateBalao1 = false;
  animateBalao2 = false;
  animateBalao3 = false;
  animateBalao4 = false;
  animateBalao5 = false;
  animateBalao6 = false;
  animateBalao7 = false;
  animateBalao8 = false;
  animateBalao9 = false;
  animateBalao10 = false;
  animateBalao11 = false;
  animateBalao12 = false;
  animateBalao13 = false;
  animateBalaoZapfarma = false;
  animateBalaoAvatar = false;
  animateBalaoZapfarma2 = false;
  animateBalaoZapfarma3 = false;

  animateArray: any = [];
  @ViewChild('nswiper', { static: false }) swiper?: any;

  bounce: any;
  constructor(
    private formBuilder: FormBuilder,
    private _contatoService: ContatoService,
    private _webhooService: WebHookService,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit() {
    const swiperEl = document.querySelector('swiper-container');
    this.criarForm();
    swiperEl?.addEventListener('swiper-slidechange', (event: any) => {
      const index = event.detail[0].activeIndex;
      this.limparAnimacao();
      this.validarIndex(index);
    });

    //Carrega animação inicial
    this.Slide0animate0();
    this.Slide0animate1();
    this.Slide0animate2();
  }

  clickNext() {
    this.swiper.nativeElement.swiper.slideNext();
  }

  clickBack(val: boolean) {
    this.swiper.nativeElement.swiper.slidePrev();
  }

  validarIndex(index: any) {
    switch (index) {
      case 0:
        this.Slide0animate0();
        this.Slide0animate1();
        this.Slide0animate2();
        break;
      case 1:
        this.Slide1animateBalao();
        this.Slide1animateBalao2();
        this.Slide1animateBalao3();
        break;
      case 2:
        this.Slide1animateBalao4();
        this.Slide1animateBalao5();
        this.Slide1animateBalao6();
        break;
      case 3:
        this.Slide1animateBalao7();
        this.Slide1animateBalao8();
        this.Slide1animateBalao9();
        break;
      case 4:
        this.Slide1animateBalao10();
        this.Slide1animateBalao11();
        this.Slide1animateBalao12();
        this.Slide1animateBalao13();
        break;
      case 5:
        this.Slide1animateAvatar();
        this.Slide1animateBalao14();
        this.Slide1animateBalao15();
        this.Slide1animateBalao16();
        break;
      default:
        break;
    }
  }

  Slide0animate0() {
    setTimeout(() => {
      this.animate0 = true;
    }, 100);
  }

  Slide0animate1() {
    setTimeout(() => {
      this.animate1 = true;
    }, 2000);
  }

  Slide0animate2() {
    setTimeout(() => {
      this.animate2 = true;
    }, 3000);
  }

  Slide1animateBalao(): any {
    this.animateBalao1 = true;
  }

  Slide1animateBalao2() {
    this.animateBalao2 = true;
  }

  Slide1animateBalao3() {
    this.animateBalao3 = true;
  }

  Slide1animateBalao4() {
    this.animateBalao4 = true;
  }

  Slide1animateBalao5() {
    this.animateBalao5 = true;
  }

  Slide1animateBalao6() {
    this.animateBalao6 = true;
  }

  Slide1animateBalao7() {
    this.animateBalao7 = true;
  }

  Slide1animateBalao8() {
    this.animateBalao8 = true;
  }

  Slide1animateBalao9() {
    this.animateBalao9 = true;
  }

  Slide1animateBalao10() {
    this.animateBalao10 = true;
  }

  Slide1animateBalao11() {
    this.animateBalao11 = true;
  }

  Slide1animateBalao12() {
    this.animateBalao12 = true;
  }

  Slide1animateBalao13() {
    this.animateBalao13 = true;
  }

  Slide1animateBalao14() {
    setTimeout(() => {
      this.animateBalaoZapfarma = true;
    }, 500);
  }

  Slide1animateAvatar() {
    this.animateBalaoAvatar = true;
  }

  Slide1animateBalao15() {
    setTimeout(() => {
      this.animateBalaoZapfarma2 = true;
      this.animateBalaoZapfarma = false;
    }, 4000);
  }

  Slide1animateBalao16() {
    setTimeout(() => {
      this.animateBalaoZapfarma2 = false;
      this.animateBalaoZapfarma3 = true;
    }, 8000);
  }

  sendForm() {
    if (this.formSendData.valid) {
      this.enviarDados();
    }
  }

  enviarDados() {
    this.isSubmit = true;
    const dados = this.formSendData.getRawValue() as any;
    const device = this.deviceService.getDeviceInfo().deviceType;
    const browser = this.deviceService.getDeviceInfo().browser;
    dados.date_time = this.tratarData();
    dados.dispositivo = device ? device : 'Não encontrado';
    dados.browser = browser ? browser : 'Não encontrado';

    this._contatoService.enviarContato(dados).subscribe((response) => {
      if (response) {
        this.isValidForm = true;
        this.enviarDadosWebhook(dados);
      }
    });
  }

  enviarDadosWebhook(dados: any) {
    this._webhooService.enviarContatoWebHook(dados).subscribe((response) => {
      if (response) {
        this.isSubmit = false;
        this.isValidForm = true;
        this.formSendData.reset();
      }
    });
  }

  tratarData() {
    const date = new Date();
    date.setHours(date.getHours() - 3);
    const isodate = date.toISOString();
    return isodate;
  }

  criarForm() {
    this.formSendData = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nome: ['', [Validators.required, Validators.minLength(5)]],
      telefone: ['', [Validators.required]],
    });
  }

  limparAnimacao() {
    this.animate0 = false;
    this.animate1 = false;
    this.animate2 = false;
    this.animateBalao1 = false;
    this.animateBalao2 = false;
    this.animateBalao3 = false;
    this.animateBalao4 = false;
    this.animateBalao5 = false;
    this.animateBalao6 = false;
    this.animateBalao7 = false;
    this.animateBalao8 = false;
    this.animateBalao9 = false;
    this.animateBalao10 = false;
    this.animateBalao11 = false;
    this.animateBalao12 = false;
    this.animateBalao13 = false;
    this.animateBalaoZapfarma = false;
    this.animateBalaoZapfarma2 = false;
    this.animateBalaoZapfarma3 = false;
    this.animateBalaoAvatar = false;
  }
}
