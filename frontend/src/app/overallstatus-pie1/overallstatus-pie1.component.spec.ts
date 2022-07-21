import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallstatusPie1Component } from './overallstatus-pie1.component';

describe('OverallstatusPie1Component', () => {
  let component: OverallstatusPie1Component;
  let fixture: ComponentFixture<OverallstatusPie1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallstatusPie1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallstatusPie1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
