import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestidoresComponent } from './investidores.component';

describe('FranqueadosComponent', () => {
  let component: InvestidoresComponent;
  let fixture: ComponentFixture<InvestidoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestidoresComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
