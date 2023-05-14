import { configureStore } from "@reduxjs/toolkit";
import * as config from "../config";
import rootReducer from "./reducers";

const preloadedState = {
  todos: [
    {
      text: "Wash Dog",
      completed: false,
      date: new Date(),
      priority: config.MID_PRIORITY,
    },
    {
      text: "Feed Turtle",
      completed: true,
      date: new Date(),
      priority: config.HIGH_PRIORITY,
    },
  ],
  filters: [],
  detailsView: false,
  editTaskView: false,
  createNewTask: false,
};

const store = configureStore({
  reducer,
  preloadedState,
});
export default store;
