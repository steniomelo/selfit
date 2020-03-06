import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranqueadosComponent } from './franqueados.component';

describe('FranqueadosComponent', () => {
  let component: FranqueadosComponent;
  let fixture: ComponentFixture<FranqueadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FranqueadosComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranqueadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
