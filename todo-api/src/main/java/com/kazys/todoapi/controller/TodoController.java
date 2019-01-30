package com.kazys.todoapi.controller;

import com.kazys.todoapi.domain.Todo;
import com.kazys.todoapi.service.TodoService;
import com.kazys.todoapi.viewmodel.TodoViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.ValidationException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping(value = "/todos", produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public List<Todo> getAllTodos() {
        return todoService.getTodos();
    }

    @PostMapping(value = "/todos", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createTodo(@RequestBody TodoViewModel todoViewModel, BindingResult bindingResult) throws ValidationException {

        if (!bindingResult.hasErrors()) {
            todoService.createTodo(todoViewModel);
        } else {
            throw new ValidationException("Note has errors!");
        }
    }

    @DeleteMapping(value = "/todos/{id}")
    public void archiveTodo(@PathVariable Long id) {
        todoService.archiveTodo(id);
    }


}