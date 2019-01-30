import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private BASE_URL = "http://localhost:8080/api/v1";
  public TODOS_URL = `${this.BASE_URL}/todos`;

  constructor(private http: HttpClient) { }

  getAllTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(this.TODOS_URL);
  }

  createTodo(todo: Todo): Observable<any> {
    let headers = new HttpHeaders({ "content-type": "application/json", "Accept": "application/json" });
    return this.http.post(this.TODOS_URL, todo, {headers: headers});
  }

  archiveTodo(todo: Todo): Observable<any> {
    return this.http.delete(this.TODOS_URL + `/${todo.id}`);
  }
}

