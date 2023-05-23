/*
actions:
submit new task and save to store (add task to list, switch view, change current selected task)
submit task edit (change information in task list, switch view, change current selected task)
check off task
*/

import { createSlice } from "@reduxjs/toolkit";
import * as config from "../config.js";

const today = new Date().getTime();

const toDoSlice = createSlice({
  name: "todos",
  initialState: {
    idCounter: 2,
    active: -1,
    date: today,
    list: [
      {
        id: 0,
        name: "Wash Dog",
        completed: false,
        date: new Date(today - 86400000).toDateString(),
        priority: config.MID_PRIORITY,
        notes: "Wash dog with flea shampoo",
      },
      {
        id: 1,
        name: "Feed Turtle",
        completed: true,
        date: new Date(today).toDateString(),
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
        date: new Date(action.payload?.date).toDateString(),
        priority: +action.payload?.priority,
        notes: action.payload.notes,
      });
      state.active = state.idCounter;
      state.idCounter++;
    },
    //editing an existing task
    editToDo: (state, action) => {
      let todoInd = state.list.findIndex((el) => el.id === action.payload.id);
      console.log(todoInd);
      state.list[todoInd] = Object.assign({}, state.list[todoInd], {
        name: action.payload.name,
        date: new Date(action.payload?.date).toDateString(),
        priority: action.payload.priority,
        notes: action.payload.notes,
      });
    },
    //deleting a task
    deleteToDo: (state, action) => {
      let todoInd = state.list.findIndex((el) => el.id === action.payload.id);
      state.list.splice(todoInd, 1);
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

export const { submitToDo, editToDo, deleteToDo, toggleToDo, changeActive } =
  toDoSlice.actions;

export default toDoSlice.reducer;

//selectors
export const selectList = (state) => state.todos.list;
export const selectActive = (state) => state.todos.active;
export const selectDate = (state) => state.todos.date;
