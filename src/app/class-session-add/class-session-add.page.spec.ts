import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSessionAddPage } from './class-session-add.page';

describe('ClassSessionAddPage', () => {
  let component: ClassSessionAddPage;
  let fixture: ComponentFixture<ClassSessionAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassSessionAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSessionAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
