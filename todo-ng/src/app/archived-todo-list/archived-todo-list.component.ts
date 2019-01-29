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
export class ArchivedTodoListComponent{

  @select() archivedTodos;

  dataSource = this.archivedTodos;
  displayedColumns = ['content'];

  constructor(private ngRedux: NgRedux<AppState>) { }

}
