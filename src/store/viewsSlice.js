/*
actions:
start new task creation on click to change view (switch flag)
submit new task and save to store (add task to list, switch view)
edit task (switch flag to change view)
submit task edit (change information in task list, switch view)
select task (switch flag to change to details view, change current selected task)
*/

import { createSlice } from "@reduxjs/toolkit";

const viewsSlice = createSlice({
  name: views,
  initialState: {
    detailsView: false,
    editTaskView: false,
    createNewTask: false,
  },
  reducer: {
    openDetails: (viewsState, action) => {},
    closeDetails: (viewsState, action) => {},
    openNew: (viewsState, action) => {},
    submitToDoViews: (viewsState, action) => {},
    openEdit: (viewsState, action) => {},
    submitEditViews: (viewsState, action) => {},
  },
});
//Views Changes

export const {
  openDetails,
  closeDetails,
  openNew,
  submitToDoViews,
  openEdit,
  submitEditViews,
} = viewsSlice.actions;

export default viewsSlice.reducer;
