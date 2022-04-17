import React, { useContext, useState } from "react";
import { TodosContext } from "./App";

import {
  Box,
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";

const ToDoList = () => {
  const { state, dispatch } = useContext(TodosContext);
  const [todoText, setTodoText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const buttonTitle = editMode ? "Edit" : "Add";

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch({ type: "add", payload: todoText });
    // setTodoText("");

    if (editMode) {
      dispatch({ type: "edit", payload: { ...editTodo, text: todoText } });
      setEditMode(false);
      setEditTodo(null);
    } else {
      dispatch({ type: "add", payload: todoText });
    }
    setTodoText("");
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginTop: "2rem" }}>
            <FormControl>
              <InputLabel htmlFor="my-input">Enter Todo</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                onChange={(e) => setTodoText(e.target.value)}
                value={todoText}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "1rem" }}
              type="submit"
            >
              {buttonTitle}
            </Button>
          </Box>
        </form>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
              <TableCell
                sx={{ color: "white", fontSize: "1.3em" }}
                align="center"
              >
                ToDo List
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "1.3em" }}
                align="center"
              >
                Edit
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "1.3em" }}
                align="center"
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.todos.map((todo, index) => (
              <TableRow
                key={todo.id}
                style={
                  index % 2
                    ? { background: "#cccccc" }
                    : { background: "white" }
                }
              >
                <TableCell sx={{ color: "black" }} align="center">
                  {todo.text}
                </TableCell>
                <TableCell sx={{ color: "black" }} align="center">
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      setTodoText(todo.text);
                      setEditMode(true);
                      setEditTodo(todo);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => dispatch({ type: "delete", payload: todo })}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ToDoList;
