import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityTranslationChartComponent } from './quality-translation-chart.component';

describe('QualityTranslationChartComponent', () => {
  let component: QualityTranslationChartComponent;
  let fixture: ComponentFixture<QualityTranslationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityTranslationChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityTranslationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
