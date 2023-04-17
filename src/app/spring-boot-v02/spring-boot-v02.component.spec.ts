/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SpringBootV02Component } from './spring-boot-v02.component';

describe('SpringBootV02Component', () => {
  let component: SpringBootV02Component;
  let fixture: ComponentFixture<SpringBootV02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpringBootV02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpringBootV02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
