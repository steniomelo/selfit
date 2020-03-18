import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2Module } from 'angulartics2';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { SacComponent } from './sac.component';

describe('SacComponent', () => {
  let component: SacComponent;
  let fixture: ComponentFixture<SacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, Angulartics2Module.forRoot(), CoreModule, SharedModule, HttpClientTestingModule],
      declarations: [SacComponent],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
