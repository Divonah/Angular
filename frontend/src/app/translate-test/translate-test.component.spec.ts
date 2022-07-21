import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateTestComponent } from './translate-test.component';

describe('TranslateTestComponent', () => {
  let component: TranslateTestComponent;
  let fixture: ComponentFixture<TranslateTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslateTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
