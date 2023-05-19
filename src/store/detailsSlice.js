/*
actions:
start new task creation on click to change view (switch flag)
submit new task and save to store (add task to list, switch view)
edit task (switch flag to change view)
submit task edit (change information in task list, switch view)
select task (switch flag to change to details view, change current selected task)
*/

import { createSlice } from "@reduxjs/toolkit";
import * as config from "../config";

const detailsSlice = createSlice({
  name: "details",
  initialState: {
    activeView: config.TASK_DETAILS,
  },
  reducers: {
    openDetails: (state, action) => {
      state.activeView = config.TASK_DETAILS;
    },
    openEdit: (state, action) => {
      state.activeView = config.TASK_EDIT;
    },
    openCreate: (state, action) => {
      state.activeView = config.TASK_CREATE;
    },
  },
});
//Views Changes

export const { openDetails, openEdit, openCreate } = detailsSlice.actions;

export default detailsSlice.reducer;

export const selectView = (state) => state.details.activeView;
