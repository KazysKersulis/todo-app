import { Todo } from './todo';
import { POPULATE_TODO_LISTS, ADD_TODO, ARCHIVE_TODO } from './actions';

export interface AppState {
    todos: Todo[];
    archivedTodos: Todo[]
}

export const INITIAL_STATE: AppState = {
    todos: [],
    archivedTodos: []
}

export function rootReducer(state, action) {
    switch(action.type) {
        case POPULATE_TODO_LISTS: {
            return Object.assign({}, state, {
                todos: action.todos.filter(t => t.archived == false),
                archivedTodos: state.todos.filter(t => t.archived == true)
            })
        }
        case ADD_TODO: {
            action.todo.id = state.todos.length + 1;
            return Object.assign({}, state, {
                todos: state.todos.concat(Object.assign({}, action.todo))
            })
        }
        case ARCHIVE_TODO: {
            let todo = state.todos.find(t => t.id === action.id);
            let index = state.todos.indexOf(todo);
            return Object.assign({}, state, {
                todos: [
                    ...state.todos.slice(0, index),
                    Object.assign({}, todo, {
                        archived: !todo.archived,
                        completed: new Date()}),
                    ...state.todos.slice(index + 1)
                ],
                archivedTodos: state.archivedTodos.concat(Object.assign({}, action.todo))
            })
        }
    }
    return state;
}