import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const data = localStorage.getItem("authToken") ?? "";
const parsedData: { token: string } = data ? JSON.parse(data) : null;
const initialState = {
  data: parsedData ?? {
    token: "",
  },
  isLoggedIn: data?true:false,
};

const adminAuthSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<{ token: string }>) {
      localStorage.setItem(
        "authToken",
        JSON.stringify({
          token: action.payload.token,
        })
      );
      state.data = { token: action.payload.token };
      state.isLoggedIn = true;
    },
    clearToken(state) {
      state.data = {
        token: "",
      };
      state.isLoggedIn = false;
      localStorage.removeItem("authToken");
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { setToken, clearToken, login, logout } = adminAuthSlice.actions;

export const selectAdminAuth = (state: RootState) => state.admin.data;
export const selectIsAdminLoggedIn = (state: RootState) => state.admin.isLoggedIn;

export const adminAuthReducer = adminAuthSlice.reducer;
