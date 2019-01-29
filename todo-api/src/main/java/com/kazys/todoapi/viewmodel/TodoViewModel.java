package com.kazys.todoapi.viewmodel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TodoViewModel {

    @NotNull
    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date created;
}
