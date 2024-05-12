import { createSlice } from "@reduxjs/toolkit";

interface ExpandState {
  expandSidebar: boolean;
}

const initialState: ExpandState = {
  expandSidebar: true,
};

const ExpandSlice = createSlice({
  name: "expandSidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.expandSidebar = !state.expandSidebar;
    },
  },
});

export const { toggleSidebar } = ExpandSlice.actions;

export default ExpandSlice.reducer;
