import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const accessToken = localStorage.getItem("adminAccessToken") ?? "";
const refreshToken = localStorage.getItem("AdminRefreshToken");

const initialState = {
  data: {
    accessToken,
    refreshToken
  },
  isLoggedIn: accessToken ? true : false,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setTokenAdmin(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) {
      localStorage.setItem(
        "adminAccessToken",
        JSON.stringify({
          accessToken: action.payload.accessToken,
        })
      );
      localStorage.setItem(
        "AdminRefreshToken",
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
      localStorage.removeItem("adminAccessToken");
      localStorage.removeItem("AdminRefreshToken");
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

export const { setTokenAdmin, clearTokenAdmin, login, logout } =
  adminAuthSlice.actions;

export const selectAdminAuth = (state: RootState) => state.admin.data;
export const selectIsAdminLoggedIn = () => {
  const accessToken = localStorage.getItem("adminAccessToken");
  return accessToken ? true : false;
};
export const adminAuthReducer = adminAuthSlice.reducer;
