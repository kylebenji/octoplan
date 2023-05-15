import { configureStore } from "@reduxjs/toolkit";
import * as config from "./config";

const preloadedState = {
  todos: {
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
  filters: [],
  views: { detailsView: false, editTaskView: false, createNewTask: false },
};

/*
actions:
to do list:
submit new task and save to store (add task to list, switch view, change current selected task)
submit task edit (change information in task list, switch view, change current selected task)
check off task

flags:
start new task creation on click to change view (switch flag)
submit new task and save to store (add task to list, switch view)
edit task (switch flag to change view)
submit task edit (change information in task list, switch view)
select task (switch flag to change to details view, change current selected task)

filters:
toggle filter (change filter list in store which can then be parsed with react)
*/

import { combineReducers } from "@reduxjs/toolkit";

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

function submitToDo(toDosState, action) {}
function editToDo(toDosState, action) {}
function toggleToDo(toDosState, action) {}

const todosReducer = createReducer(preloadedState.todos, {
  SUBMIT_TODO: submitToDo,
  SUBMIT_EDIT_TODO: editToDo,
  TOGGLE_TODO: toggleToDo,
});

function toggleFilter(filtersState, action) {}

const filtersReducer = createReducer(preloadedState.filters, {
  TOGGLE_FILTER: toggleFilter,
});

function openDetails(viewsState, action) {}
function closeDetails(viewsState, action) {}
function openNew(viewsState, action) {}
function submitToDoViews(viewsState, action) {}
function openEdit(viewsState, action) {}
function submitEditViews(viewsState, action) {}

const viewsReducer = createReducer(preloadedState.views, {
  TASK_DETAILS: openDetails,
  CLOSE_DETAILS: closeDetails,
  ADD_TODO: openNew,
  SUBMIT_TODO: submitToDoViews,
  EDIT_TODO: openEdit,
  SUBMIT_EDIT_TODO: submitEditViews,
});

const reducer = {
  todos: todosReducer,
  filters: filtersReducer,
  views: viewsReducer,
};

const store = configureStore({
  reducer,
  preloadedState,
});
export default store;
