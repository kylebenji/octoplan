/*
actions:
toggle filter (change filter list in store which can then be parsed with react)
*/

import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filters",
  initialState: [],
  reducers: {
    toggleFilter: (state, action) => {},
  },
});

//action creators
export const { toggleFilter } = filterSlice.actions;

export default filterSlice.reducer;
