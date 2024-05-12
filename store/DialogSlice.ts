import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Link {
  link: string;
  link_text: string;
}

interface DialogState {
  show: boolean;
  header: string;
  msgs: string[];
  link: Link;
}

const initialState: DialogState = {
  show: false,
  header: "",
  msgs: [],
  link: {
    link: "",
    link_text: "",
  },
};

const DialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showDialog(
      state,
      action: PayloadAction<{ header: string; msgs: string[]; link: Link }>
    ) {
      const { header, msgs, link } = action.payload;
      state.show = true;
      state.header = header;
      state.msgs = msgs;
      state.link = link;
    },
    hideDialog(state) {
      state.show = false;
      state.header = "";
      state.msgs = [];
      state.link = { link: "", link_text: "" };
    },
  },
});

export const { showDialog, hideDialog } = DialogSlice.actions;

export default DialogSlice.reducer;
