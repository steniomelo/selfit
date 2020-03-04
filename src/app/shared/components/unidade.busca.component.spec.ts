import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeBuscaComponent } from './unidade.busca.component';

describe('UnitSearchComponent', () => {
  let component: UnidadeBuscaComponent;
  let fixture: ComponentFixture<UnidadeBuscaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadeBuscaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
