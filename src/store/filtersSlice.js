/*
actions:
toggle filter (change filter list in store which can then be parsed with react)
*/

/*
filters to include:
completed
today
*/

import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filters",
  initialState: {
    completed: true,
    today: false,
    sortBy: "None",
  },
  reducers: {
    toggleFilter: (state, action) => {
      const filter = action.payload.filter;
      state[filter] = !state[filter];
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload.sortBy;
    },
  },
});

//action creators
export const { toggleFilter, setSortBy } = filterSlice.actions;

//selectors
export const selectFilters = (state) => state.filters;

export default filterSlice.reducer;
