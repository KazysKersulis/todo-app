package com.kazys.todoapi.domain;

import java.util.Date;

public class Todo {

    private long id;
    private String content;
    private boolean archived;
    private Date created;
    private Date completed;

    public Todo() {
    }

    public Todo(long id, String content, boolean archived, Date created, Date completed) {
        this.id = id;
        this.content = content;
        this.archived = archived;
        this.created = created;
        this.completed = completed;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getCompleted() {
        return completed;
    }

    public void setCompleted(Date completed) {
        this.completed = completed;
    }
}
