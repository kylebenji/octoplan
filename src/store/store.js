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
  saveState({
    todos: store.getState().todos,
    filters: store.getState().filters,
  });
});

export default store;
