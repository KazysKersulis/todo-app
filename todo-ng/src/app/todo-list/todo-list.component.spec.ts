import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule, MatCardModule, MatDialogModule, MatDialog } from '@angular/material';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { AppState, rootReducer, INITIAL_STATE } from '../store';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { POPULATE_TODO_LISTS } from '../actions';

// ngRedux.configureStore(rootReducer, INITIAL_STATE);

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: NgRedux<AppState>;
  let todoService: TodoService;
  let todos: Todo[] =  [
    {
      id: 1,
      content: "Test content",
      archived: false,
      created: new Date()
    }
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [
        MatTableModule,
        HttpClientModule,
        NgReduxModule,
        MatCardModule,
        MatDialogModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [HttpClient, NgRedux]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = fixture.debugElement.injector.get(store);
    // store.configureStore(rootReducer, INITIAL_STATE)
    todoService = fixture.debugElement.injector.get(TodoService);
    store.dispatch({ type: POPULATE_TODO_LISTS, todos: todos });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
