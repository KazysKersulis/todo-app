import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule, MatCardModule, MatDialogModule, MatDialog } from '@angular/material';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { AppState, rootReducer, INITIAL_STATE } from '../store';
import { TodoService } from '../todo.service';
import { Subject } from 'rxjs';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [
        MatTableModule,
        HttpClientModule,
        NgReduxTestingModule,
        MatCardModule,
        MatDialogModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [HttpClient, MockNgRedux]
    }).compileComponents();

    MockNgRedux.reset();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    todoService = fixture.debugElement.injector.get(TodoService);
  });

  it('Selects the current todos state from Redux', done => {
    const fixture = TestBed.createComponent(TodoListComponent);
    const componentUnderTest = fixture.debugElement.componentInstance;

    const todoStub: Subject<Object[]> = MockNgRedux.getSelectorStub<AppState, Object[]>('todos');

    const expectedTodoValues = {
      todos: [{
        id: 1,
        content: 'test mock content',
        archived: false,
        created: new Date()
      }]
    }

    todoStub.next(expectedTodoValues);

    todoStub.complete();

    componentUnderTest.todos$
      .subscribe(
        actualValues => expect(actualValues).toEqual(expectedTodoValues),
        null,
        done)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
