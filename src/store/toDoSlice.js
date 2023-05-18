/*
actions:
submit new task and save to store (add task to list, switch view, change current selected task)
submit task edit (change information in task list, switch view, change current selected task)
check off task
*/

import { createSlice } from "@reduxjs/toolkit";
import * as config from "../config.js";

const toDoSlice = createSlice({
  name: "todos",
  initialState: {
    idCounter: 2,
    active: 0,
    list: [
      {
        id: 0,
        name: "Wash Dog",
        completed: false,
        date: new Date().toDateString(),
        priority: config.MID_PRIORITY,
        notes: "Wash dog with flea shampoo",
      },
      {
        id: 1,
        name: "Feed Turtle",
        completed: true,
        date: new Date().toDateString(),
        priority: config.HIGH_PRIORITY,
        notes: "Feed turtle veggies with a hint of spice",
      },
    ],
  },
  reducers: {
    //adding a new task to the list
    submitToDo: (state, action) => {
      state.list.push({
        id: state.idCounter,
        name: action.payload?.name,
        date: action.payload?.date,
        priority: +action.payload?.priority,
        notes: action.payload.notes,
      });
      state.active = state.idCounter;
      state.idCounter++;
    },
    //editing an existing task
    editToDo: (state, action) => {
      let todoInd = state.list.findIndex((el) => el.id === action.payload.id);
      //   state.list[todoInd] = updateObject(state.list[todoInd], {
      //     text: action.text,
      //     date: action.date,
      //     priority: action.priority,
      //   });
    },
    //setting a tasks completed flag
    toggleToDo: (state, action) => {
      let todoInd = state.list.findIndex((el) => el.id === action.payload.id);
      state.list[todoInd].completed = !state.list[todoInd].completed;
    },
    //changing the selected todo
    changeActive: (state, action) => {
      state.active = action.payload.id;
    },
  },
});

export const { submitToDo, editToDo, toggleToDo, changeActive } =
  toDoSlice.actions;

export default toDoSlice.reducer;

export const selectList = (state) => state.todos.list;
export const selectActive = (state) => state.todos.active;
