import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeTranslationChartComponent } from './de-translation-chart.component';

describe('DeTranslationChartComponent', () => {
  let component: DeTranslationChartComponent;
  let fixture: ComponentFixture<DeTranslationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeTranslationChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeTranslationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
