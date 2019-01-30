import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule, MatCardModule, MatDialogModule, MatDialog } from '@angular/material';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { AppState } from '../store';
import { TodoService } from '../todo.service';
import { Subject } from 'rxjs';
import { Todo } from '../todo';
import { POPULATE_TODO_LISTS } from '../actions';

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

  it('Gets the current todos from Redux state', done => {
    const componentFixture = TestBed.createComponent(TodoListComponent);
    const componentUnderTest = fixture.debugElement.componentInstance;

    const todoStub: Subject<Todo[]> = MockNgRedux.getSelectorStub<AppState, Todo[]>('activeTodos');

    const expectedTodoValues = [{
        id: 1,
        content: 'test mock content',
        archived: false,
        created: new Date()
      }]
    
    todoStub.next(expectedTodoValues);

    todoStub.complete();

    componentUnderTest.activeTodos$
      .subscribe(
        actualValues => expect(actualValues).toEqual(expectedTodoValues),
        null,
        done)
  });

  it('should return all todos', inject([TodoService], service => {
    service.getAllTodos().subscribe(res => {
      expect(res.length).toBeGreaterThan(0);
    });
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
