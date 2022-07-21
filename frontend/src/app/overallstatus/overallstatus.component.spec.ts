import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallstatusComponent } from './overallstatus.component';

describe('OverallstatusComponent', () => {
  let component: OverallstatusComponent;
  let fixture: ComponentFixture<OverallstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
