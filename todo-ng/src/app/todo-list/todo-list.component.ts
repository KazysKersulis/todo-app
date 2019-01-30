import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { AppState } from '../store';
import { NgRedux, select } from '@angular-redux/store';
import { POPULATE_TODO_LISTS, ARCHIVE_TODO, ADD_TODO } from '../actions';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @select() readonly todos$: Observable<Todo[]>

  todo:Todo = {
    id: null,
    content: '',
    archived: false,
    created: null
  }

  dataSource;
  displayedColumns = ['content', 'created', 'actions'];

  constructor(private todoService: TodoService,
    private ngRedux: NgRedux<AppState>,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.todoService.getAllTodos().subscribe(
      todos => {
        this.ngRedux.dispatch({ type: POPULATE_TODO_LISTS, todos: todos });
        this.dataSource = this.todos$;
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      height: '260px',
      width: '600px',
      data: {todo: this.todo}
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result !== 'Cancel' && typeof result !== 'undefined') {
        this.todo.content = result;
        this.createTodo(this.todo);
      }
    });
  }

  archiveTodo(todo: Todo) {
    this.ngRedux.dispatch({ type: ARCHIVE_TODO, todo: todo })
    this.todoService.archiveTodo(todo).subscribe(() => {
      err => {
        console.log("Todo archive server error");
      }
    });
  }

  createTodo(todo: Todo) {
    this.ngRedux.dispatch({type: ADD_TODO, todo:todo});
    this.todoService.createTodo(todo).subscribe(() => {
      err => {
        console.log("New Todo Item creation server errror");
      }
    });
  }
}