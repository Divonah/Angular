import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackchartComponent } from './stackchart.component';

describe('StackchartComponent', () => {
  let component: StackchartComponent;
  let fixture: ComponentFixture<StackchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
