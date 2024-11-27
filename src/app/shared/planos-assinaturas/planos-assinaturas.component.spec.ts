/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlanosAssinaturasComponent } from './planos-assinaturas.component';

describe('PlanosAssinaturasComponent', () => {
  let component: PlanosAssinaturasComponent;
  let fixture: ComponentFixture<PlanosAssinaturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanosAssinaturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanosAssinaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
