/*
actions:
submit new task and save to store (add task to list, switch view, change current selected task)
submit task edit (change information in task list, switch view, change current selected task)
check off task
*/

import { createSlice } from "@reduxjs/toolkit";
import * as config from "../config.js";
import { datesAreOnSameDay, parseInputDate } from "../helpers.js";

const getActionDate = (date) => {
  return date ? parseInputDate(date).toDateString() : "";
};

const toDoSlice = createSlice({
  name: "todos",
  initialState: {
    idCounter: 2,
    active: -1,
    date: new Date().getTime(),
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
        completedDate: new Date().toDateString(),
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
        date: getActionDate(action.payload.date),
        priority: action.payload.priority
          ? +action.payload.priority
          : config.MID_PRIORITY,
        notes: action.payload.notes,
      });
      state.active = state.idCounter;
      state.idCounter++;
    },
    //editing an existing task
    editToDo: (state, action) => {
      let todoInd = state.list.findIndex((el) => el.id === action.payload.id);
      state.list[todoInd] = Object.assign({}, state.list[todoInd], {
        name: action.payload.name,
        date: getActionDate(action.payload.date),
        priority: action.payload.priority
          ? action.payload.priority
          : config.MID_PRIORITY,
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
      state.list[todoInd].completedDate = state.list[todoInd].completed
        ? new Date().toDateString()
        : null;
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
export const selectTaskData = (state) => {
  const [tasksDueToday, tasksCompletedToday, tasksPastDue] =
    state.todos.list.reduce(
      (acc, task) => {
        const now = new Date();
        const taskDate = new Date(task.date);
        const taskCompletedDate = new Date(task.completedDate);
        if (task.completed) {
          if (datesAreOnSameDay(now, taskCompletedDate)) acc[1]++; //tasks completed today
        }
        if (!task.completed) {
          if (datesAreOnSameDay(now, taskDate)) {
            acc[0]++; // tasks due today
          } else if (now > taskDate) {
            acc[2]++; //tasks past due
          }
        }

        return acc;
      },
      [0, 0, 0]
    );

  return {
    tasksDueToday,
    tasksCompletedToday,
    tasksPastDue,
  };
};
