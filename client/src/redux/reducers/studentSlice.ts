import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";



const initialState = {
  data: {
    studentDetails:"",
  },
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setDetails(
      state,
      action: PayloadAction<{ details:string}>
    ) {
      state.data = {
        studentDetails: action.payload.details,
      };
    },
    clearDetails(state) {
      state.data = {
        studentDetails:""
      }
    },
  },
});

export const { setDetails,clearDetails} = studentSlice.actions;

export const selectStudent = (state: RootState) => state.student.data

export const studentReducer = studentSlice.reducer;
