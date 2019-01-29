package com.kazys.todoapi.viewmodel;

import org.jooq.Require;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class TodoViewModel {

    @NotNull
    @Min(5)
    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date created;

    public String getContent() {
        return content;
    }

    public Date getCreated() {
        return created;
    }
}
