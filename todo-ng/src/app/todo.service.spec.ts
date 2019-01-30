import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('TodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [HttpClient]
  }));

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });
});
