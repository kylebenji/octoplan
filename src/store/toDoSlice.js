/*
actions:
submit new task and save to store (add task to list, switch view, change current selected task)
submit task edit (change information in task list, switch view, change current selected task)
check off task
*/

import { createSlice } from "@reduxjs/toolkit";
import { updateObject } from "./helpers";

const toDoSlice = createSlice({
  name: todos,
  initialState: {
    idCounter: 2,
    list: [
      {
        id: 0,
        text: "Wash Dog",
        completed: false,
        date: new Date(),
        priority: config.MID_PRIORITY,
      },
      {
        id: 1,
        text: "Feed Turtle",
        completed: true,
        date: new Date(),
        priority: config.HIGH_PRIORITY,
      },
    ],
  },
  reducers: {
    //adding a new task to the list
    submitToDo: (state, action) => {
      state.idCounter++;
      state.list.push({
        id: newState.idCounter,
        text: action.stext,
        date: action.date,
        priority: action.priority,
      });
    },
    //editing an existing task
    editToDo: (state, action) => {
      let todoInd = state.list.findIndex((el) => el.id === action.id);
      state.list[todoInd] = updateObject(state.list[todoInd], {
        text: action.text,
        date: action.date,
        priority: action.priority,
      });
    },
    //setting a tasks completed flag
    toggleToDo: (toDosState, action) => {
      let todoInd = state.list.findIndex((el) => el.id === action.id);
      state.list[todoInd] = updateObject(state.list[todoInd], {
        completed: !todo.completed,
      });
    },
  },
});

export const { submitToDo, editToDo, toggleToDo } = toDoSlice.actions;

export default toDoSlice.reducer;
