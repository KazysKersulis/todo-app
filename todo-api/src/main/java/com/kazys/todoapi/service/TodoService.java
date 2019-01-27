package com.kazys.todoapi.service;

import com.kazys.todoapi.Tables;
import com.kazys.todoapi.domain.Todo;
import com.kazys.todoapi.viewmodel.TodoViewModel;
import org.jooq.DSLContext;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    DSLContext dsl;

    public List<Todo> getTodos() {
        return dsl
                .selectFrom(Tables.TODOS_)
                .fetch()
                .stream()
                .map(e -> mapper.map(e, Todo.class))
                .collect(Collectors.toList());
    }

    public void createTodo(TodoViewModel todoViewModel) {
        dsl.insertInto(Tables.TODOS_)
                .columns(Tables.TODOS_.CONTENT)
                .values(todoViewModel.getContent())
                .execute();
    }

    public void archiveTodo(Long id) {
//        Date date = new Date();
//        Timestamp timestamp = new Timestamp(date.getTime());

        dsl.update(Tables.TODOS_)
                .set(Tables.TODOS_.ARCHIVED, true)
                .set(Tables.TODOS_.COMPLETED, Timestamp.from(Instant.now()))
                .where(Tables.TODOS_.ID.equal(id.intValue()))
                .execute();
    }

}
