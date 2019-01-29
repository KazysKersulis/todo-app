package com.kazys.todoapi;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.kazys.todoapi.controller.TodoController;
import com.kazys.todoapi.service.TodoService;
import com.kazys.todoapi.viewmodel.TodoViewModel;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Date;

@RunWith(SpringRunner.class)
@WebMvcTest
public class TodoRestControllerMockMvcTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TodoService todoService;

    @MockBean
    private ModelMapper modelMapper;

    @InjectMocks
    private TodoController todoController;

    private static final String REQUEST_MAPPING = "/api/v1/todos";

    @Test
    public void getTodos() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.get(REQUEST_MAPPING).header("content-type", "application/json; charset=utf-8"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void createTodo() throws Exception {
        TodoViewModel todoViewModel = new TodoViewModel("New content", new Date());
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson=ow.writeValueAsString(todoViewModel);
        this.mockMvc.perform(MockMvcRequestBuilders.post(REQUEST_MAPPING).header("content-type", "application/json; charset=utf-8")
                .content(requestJson))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void archiveTodo() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.delete(REQUEST_MAPPING + "/1"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

}
