import {
  Container,
  Button,
  Stack,
  ButtonGroup,
  Typography
} from "@mui/material";
import { useReducer, createContext } from "react";
import "./styles.css";
import ToDoList from "./todoList";
import { v4 as uuidv4 } from "uuid";

export const TodosContext = createContext();

const App = () => {
  const todosInitialState = {
    todos: [
      { id: 1, text: "finishing writing hooks chapter" },
      { id: 2, text: "play with kids" },
      { id: 3, text: "read bible" }
    ]
  };

  const todosReducer = (state, action) => {
    switch (action.type) {
      case "add":
        const newToDo = { id: uuidv4(), text: action.payload };
        const addedToDo = [...state.todos, newToDo];
        return { ...state, todos: addedToDo };
      case "delete":
        const filterTodoState = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        return { ...state, todos: filterTodoState };
      case "edit":
        const updatedToDo = { ...action.payload };
        const updatedToDoIndex = state.todos.findIndex(
          (t) => t.id === action.payload.id
        );
        const updatedToDos = [
          ...state.todos.slice(0, updatedToDoIndex),
          updatedToDo,
          ...state.todos.slice(updatedToDoIndex + 1)
        ];
        return { ...state, todos: updatedToDos };
      default:
        return todosInitialState;
    }
  };
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);
  return (
    <>
      <Container maxWidth="sm" align="center">
        <TodosContext.Provider value={{ state, dispatch }}>
          <ToDoList />
        </TodosContext.Provider>
        <Typography variant="h3"></Typography>
      </Container>
    </>
  );
};

export default App;
