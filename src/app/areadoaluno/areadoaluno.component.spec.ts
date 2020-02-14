import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreadoalunoComponent } from './areadoaluno.component';

describe('AreadoalunoComponent', () => {
  let component: AreadoalunoComponent;
  let fixture: ComponentFixture<AreadoalunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AreadoalunoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreadoalunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
