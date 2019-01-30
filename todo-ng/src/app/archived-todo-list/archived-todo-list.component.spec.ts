import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedTodoListComponent } from './archived-todo-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule, MatCardModule, MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NgReduxModule } from '@angular-redux/store';

describe('ArchivedTodoListComponent', () => {
  let component: ArchivedTodoListComponent;
  let fixture: ComponentFixture<ArchivedTodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedTodoListComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        MatTableModule,
        HttpClientModule,
        NgReduxModule,
        MatCardModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
