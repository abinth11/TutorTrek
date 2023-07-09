import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  data: {
    footerVisible:true,
  },
};

const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    setFooterVisible(state, action: PayloadAction<boolean>) {
      state.data = {
        footerVisible: action.payload,
      };
    }
  },
});

export const { setFooterVisible } = helperSlice.actions;

export const selectIsFooterVisible = (state: RootState) => state.helper.data.footerVisible


export const helperReducer = helperSlice.reducer;
