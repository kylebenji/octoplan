/*
actions:
start new task creation on click to change view (switch flag)
submit new task and save to store (add task to list, switch view)
edit task (switch flag to change view)
submit task edit (change information in task list, switch view)
select task (switch flag to change to details view, change current selected task)
*/

import { createSlice } from "@reduxjs/toolkit";
import { TASK_DETAILS, TASK_EDIT } from "../config";

const detailsSlice = createSlice({
  name: "details",
  initialState: {
    activeView: TASK_EDIT,
  },
  reducers: {
    openDetails: (state, action) => {
      state.activeView = TASK_DETAILS;
    },
    openEdit: (state, action) => {
      state.activeView = TASK_EDIT;
    },
  },
});
//Views Changes

export const { openDetails, openEdit } = detailsSlice.actions;

export default detailsSlice.reducer;

export const selectView = (state) => state.details.activeView;
