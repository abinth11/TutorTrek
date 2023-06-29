import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const data = localStorage.getItem("authToken") ?? "";
const parsedData: { token: string } = data ? JSON.parse(data) : null;
const initialState = {
  data: {
    accessToken: "",
    refreshToken: "",
  },
  isLoggedIn: parsedData?true:false,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setTokenAdmin(state, action: PayloadAction<{accessToken: string; refreshToken: string }>) {
      localStorage.setItem(
        "accessToken",
        JSON.stringify({
          accessToken: action.payload.accessToken,
        })
      );
      localStorage.setItem(
        "refreshToken",
        JSON.stringify({
          refreshToken: action.payload.refreshToken,
        })
      );
      state.data = {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
      state.isLoggedIn = true;
    },
    clearTokenAdmin(state) {
      state.data = {
        accessToken: "",
        refreshToken: "",
      };
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.isLoggedIn = false;
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { setTokenAdmin, clearTokenAdmin, login, logout } = adminAuthSlice.actions;

export const selectAdminAuth = (state: RootState) => state.admin.data;
export const selectIsAdminLoggedIn = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? true : false;
};
export const adminAuthReducer = adminAuthSlice.reducer;
