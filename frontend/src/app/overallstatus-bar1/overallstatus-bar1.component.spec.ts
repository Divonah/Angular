import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallstatusBar1Component } from './overallstatus-bar1.component';

describe('OverallstatusBar1Component', () => {
  let component: OverallstatusBar1Component;
  let fixture: ComponentFixture<OverallstatusBar1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallstatusBar1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallstatusBar1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
