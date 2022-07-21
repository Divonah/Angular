import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackpieComponent } from './stackpie.component';

describe('StackpieComponent', () => {
  let component: StackpieComponent;
  let fixture: ComponentFixture<StackpieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackpieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackpieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
