import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { TodoService } from '../todo.service';
import { AppState } from '../store';
import { Todo } from '../todo';
import { POPULATE_TODO_LISTS } from '../actions';

@Component({
  selector: 'app-archived-todo-list',
  templateUrl: './archived-todo-list.component.html',
  styleUrls: ['./archived-todo-list.component.css']
})
export class ArchivedTodoListComponent implements OnInit {

  @select() archivedTodos;

  // dataSource = new TodoDataSource(this);

  dataSource = this.archivedTodos;
  displayedColumns = ['content', 'created'];

  constructor(private todoService: TodoService,
    private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
    console.log(this.archivedTodos);
    this.todoService.getAllTodos().subscribe(
      res => {
        this.populateTodoList(res);
      },
      err => {
        alert("An error has occurred;")
      })
  }

  populateTodoList(todos: Todo[]) {
    this.ngRedux.dispatch({ type: POPULATE_TODO_LISTS, todos: todos });
  }

}
