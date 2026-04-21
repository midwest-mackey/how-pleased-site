import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Happiness } from './happiness';

describe('Happiness', () => {
  let component: Happiness;
  let fixture: ComponentFixture<Happiness>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Happiness]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Happiness);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
