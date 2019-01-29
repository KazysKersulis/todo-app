package com.kazys.todoapi;

import com.kazys.todoapi.controller.TodoController;
import com.kazys.todoapi.domain.Todo;
import com.kazys.todoapi.service.TodoService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class TodoControllerTests {

    private static final long id = 1;

    @InjectMocks
    private TodoController todoController;

    @Mock
    private TodoService todoService;

    @Test
    public void testGetAllTodos() {
        List<Todo> todos = new ArrayList<>();
        todos.add(new Todo(1L, "content", false, new Date()));
        Mockito.when(todoService.getTodos()).thenReturn(todos);
        List<Todo> allTodos = todoController.getAllTodos();
        assertEquals(todos, allTodos);
    }
}

