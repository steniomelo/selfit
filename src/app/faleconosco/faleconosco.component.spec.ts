import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2Module } from 'angulartics2';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { FaleconoscoComponent } from './faleconosco.component';

describe('FaleconoscoComponent', () => {
  let component: FaleconoscoComponent;
  let fixture: ComponentFixture<FaleconoscoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, Angulartics2Module.forRoot(), CoreModule, SharedModule, HttpClientTestingModule],
      declarations: [FaleconoscoComponent],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaleconoscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
