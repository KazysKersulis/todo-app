package com.kazys.todoapi.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Todo {

    private long id;
    private String content;
    private boolean archived;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date created;
}
