import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice";
import toDoReducer from "./toDoSlice";
import viewsReducer from "./detailsSlice";

//Store Setup
export default configureStore({
  reducer: {
    todos: toDoReducer,
    filters: filtersReducer,
    details: viewsReducer,
  },
});
