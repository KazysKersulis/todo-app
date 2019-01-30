import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { TodoService } from '../todo.service';
import { AppState } from '../store';
import { POPULATE_TODO_LISTS } from '../actions';


@Component({
  selector: 'app-archived-todo-list',
  templateUrl: './archived-todo-list.component.html',
  styleUrls: ['./archived-todo-list.component.css']
})
export class ArchivedTodoListComponent implements OnInit{

  @select() archivedTodos;

  dataSource = this.archivedTodos;
  displayedColumns = ['content'];

  constructor(private ngRedux: NgRedux<AppState>,
    private todoService: TodoService) {
   }

   ngOnInit() {
    this.todoService.getAllTodos().subscribe(
      todos => {
        this.ngRedux.dispatch({ type: POPULATE_TODO_LISTS, todos: todos });
        this.dataSource = this.archivedTodos;
      })
  }
}