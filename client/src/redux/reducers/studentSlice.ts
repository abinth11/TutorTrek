import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import jwt_decode from "jwt-decode";

const accessToken = localStorage.getItem("accessToken");

let decodedToken: { payload: { Id: string } } | null = null;
if (accessToken) {
  decodedToken = jwt_decode(accessToken);
}
console.log(decodedToken)
console.log('decoded')
const initialState = {
  data: {
    studentDetails: "",
    studentId: decodedToken?.payload.Id,
  },
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setDetails(state, action: PayloadAction<{ details: string }>) {
      state.data = {
        studentDetails: action.payload.details,
        studentId: "",
      };
    },
    clearDetails(state) {
      state.data = {
        studentId: "",
        studentDetails: "",
      };
    },
  },
});

export const { setDetails, clearDetails } = studentSlice.actions;

export const selectStudent = (state: RootState) => state.student.data;

export const selectStudentId = (state: RootState) =>
  state.student.data.studentId;

export const studentReducer = studentSlice.reducer;
