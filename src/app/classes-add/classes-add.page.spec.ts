import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesAddPage } from './classes-add.page';

describe('ClassesAddPage', () => {
  let component: ClassesAddPage;
  let fixture: ComponentFixture<ClassesAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
