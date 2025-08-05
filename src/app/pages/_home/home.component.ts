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

import { GetDistanceBetweenCeps } from 'cep-distance'
// const CepDistance  = inport "cep-distance";
import { GeoPlacesClient, GetPlaceCommand } from "@aws-sdk/client-geo-places"; // ES Modules import



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
export class HomeComponent {

  bounce: any;
  constructor(
    private formBuilder: FormBuilder,
    private _contatoService: ContatoService,
    private _webhooService: WebHookService,
    private deviceService: DeviceDetectorService
  ) {}

  buscaCep() {
  const km = this.calculaCeps(-22.9362311,-43.5780126, -22.9216041,-43.56324)
  console.log(Number(km  / 1000).toFixed(2))
}

calculaCeps(lat1:number,lon1:number,lat2:number,lon2:number ) {
    const R = 6371e3;

    const radLat1 = lat1 * Math.PI / 180;
    const radLon1 = lon1 * Math.PI / 180;

    const radLat2 = lat2 * Math.PI / 180;
    const radLon2 = lon2 * Math.PI / 180;

    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(radLat1) * Math.cos(radLat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    this.places();

    return distance;
}

async places() {
  const client = new GeoPlacesClient({ region: "sa-east-1" });
  const input = { // GetPlaceRequest
      PlaceId: "casa01", // required
      // AdditionalFeatures: [ // GetPlaceAdditionalFeatureList
      //   "STRING_VALUE",
      // ],
      Language: "en",
      // PoliticalView: "STRING_VALUE",
      // IntendedUse: "STRING_VALUE",
      Key: 'eyJqdGkiOiJlODNjMjg1Ny0wOGM5LTQ3NDMtYjc2NS0xMTc5ZjhiOGRjYjYifRpdjPvRoR-r_7GUqUTAuHTfQCab6IbSnUlJDe2Zjl9iHhkC7s0Dt2REzTBQFhmAzMH1Uj8WmPgwJkjWMBn9GZb_J-krQDiSWdp-s8pYiU4JX44RV_Ppv3tlqTLoWoFHdJIfv_TSxSLeJ27pS6JLMNecOulgeeOsdFfZ_crkUK14386XFc1jKbIC1wmsw_NGsypylUvotBXBfmeqXEPCFyy2QMYhjit66CN8ezr3JI3BgwqoOqiGtMBUjZbK2P742ioFbiWRZVIfFtuXpYCdvcHvEZotK9H_Mb4_53etfK11Um7cqdVToOmCjUEIR2FgvAul2efb8cn9RgVwB6JunNs.ZWU0ZWIzMTktMWRhNi00Mzg0LTllMzYtNzlmMDU3MjRmYTkx',
    };

    
    const command = new GetPlaceCommand(input);
    const response = await client.send(command);
}
}
