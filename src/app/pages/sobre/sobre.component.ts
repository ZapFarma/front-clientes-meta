import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToolbarComponent } from 'src/app/shared/toolbar/toolbar.component';
import { RodapeComponent } from '../rodape/rodape.component';


@Component({
  selector: 'front-zapfarma-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
      CommonModule,
      ToolbarComponent,
      RodapeComponent
    ]

})
export class SobreComponent {

}
