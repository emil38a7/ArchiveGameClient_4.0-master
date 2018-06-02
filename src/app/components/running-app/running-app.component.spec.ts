import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningAppComponent } from './running-app.component';

describe('RunningAppComponent', () => {
  let component: RunningAppComponent;
  let fixture: ComponentFixture<RunningAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
