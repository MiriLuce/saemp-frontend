import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolOriginComponent } from './school-origin.component';

describe('SchoolOriginComponent', () => {
  let component: SchoolOriginComponent;
  let fixture: ComponentFixture<SchoolOriginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolOriginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
