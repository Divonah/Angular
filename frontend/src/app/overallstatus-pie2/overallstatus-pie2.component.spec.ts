import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallstatusPie2Component } from './overallstatus-pie2.component';

describe('OverallstatusPie2Component', () => {
  let component: OverallstatusPie2Component;
  let fixture: ComponentFixture<OverallstatusPie2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallstatusPie2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallstatusPie2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
