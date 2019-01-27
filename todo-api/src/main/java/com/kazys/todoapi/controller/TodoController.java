package com.kazys.todoapi.controller;

import com.kazys.todoapi.domain.Todo;
import com.kazys.todoapi.service.TodoService;
import com.kazys.todoapi.viewmodel.TodoViewModel;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping(value = "/todos")
    @ResponseBody
    public List<Todo> getAllNotes() {
        return todoService.getTodos();
    }

    @PostMapping(value = "/todos")
    public void createNote(@RequestBody TodoViewModel todoViewModel, BindingResult bindingResult) throws ValidationException {

        if (!bindingResult.hasErrors()) {
            todoService.createTodo(todoViewModel);
        } else {
            throw new ValidationException("Note has errors!");
        }
    }

    @DeleteMapping(value = "/todos/{id}")
    public void archiveNote(@PathVariable Long id) {
        todoService.archiveTodo(id);
    }


}