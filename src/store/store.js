import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice";
import toDoReducer from "./toDoSlice";
import viewsReducer from "./detailsSlice";
import { loadState, saveState } from "./localStorage";

//Store Setup
const preloadedState = loadState();

const store = configureStore({
  reducer: {
    todos: toDoReducer,
    filters: filtersReducer,
    details: viewsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveState({
    todos: { list: state.todos.list, idCounter: state.todos.idCounter }, //only adding parts so that we load a new date and reset the active id each time we load
    filters: store.getState().filters,
  });
});

export default store;
