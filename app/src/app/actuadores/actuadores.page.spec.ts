import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuadoresPage } from './actuadores.page';

describe('ActuadoresPage', () => {
  let component: ActuadoresPage;
  let fixture: ComponentFixture<ActuadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActuadoresPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
