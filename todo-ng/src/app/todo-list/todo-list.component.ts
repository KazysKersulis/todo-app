import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { AppState } from '../store';
import { NgRedux, select } from '@angular-redux/store';
import { POPULATE_TODO_LISTS, ARCHIVE_TODO, ADD_TODO } from '../actions';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { MatDialog } from '@angular/material';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @select() todos;

  todo:Todo = {
    id: null,
    content: '',
    archived: false,
    created: null,
    completed: null
  }

  dataSource;
  displayedColumns = ['content', 'created', 'actions'];

  constructor(private todoService: TodoService,
    private ngRedux: NgRedux<AppState>,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.todoService.getAllTodos().subscribe(
      res => {
        this.populateTodoList(res);
        this.dataSource = this.todos;
      },
      err => {
        alert("An error has occurred;")
      })

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      height: '260px',
      width: '600px',
      data: {todo: this.todo}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Cancel' || result !== null) {
        this.todo.content = result;
        this.createTodo(this.todo);
      }
    });
  }

  populateTodoList(todos: Todo[]) {
    localStorage.setItem('user', JSON.stringify(todos));
    this.ngRedux.dispatch({ type: POPULATE_TODO_LISTS, todos: todos });
  }

  archiveTodo(todo: Todo) {
    this.ngRedux.dispatch({ type: ARCHIVE_TODO, todo: todo })
    this.todoService.archiveTodo(todo).subscribe(res => {
      console.log("archived" + todo.id);
    })
  }

  createTodo(todo: Todo) {
    this.ngRedux.dispatch({type: ADD_TODO, todo:todo});
    this.todoService.createTodo(todo).subscribe(res => {
      console.log("saved new todo: " + todo.content);
    })
  }
}