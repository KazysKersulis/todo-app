package com.kazys.todoapi.viewmodel;

import org.jooq.Require;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class TodoViewModel {

    @NotNull
    @Min(5)
    private String content;

    public String getContent() {
        return content;
    }
}
