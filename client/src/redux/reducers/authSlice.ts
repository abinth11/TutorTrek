import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const accessToken = localStorage.getItem("accessToken")
const refreshToken = localStorage.getItem('refreshToken')

const initialState = {
  data: {
    accessToken:accessToken,
    refreshToken,
  },
  isLoggedIn: accessToken ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) {
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
    clearToken(state) {
      state.data = {
        accessToken: "",
        refreshToken: "",
      };
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.isLoggedIn = false;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.data;

export const selectAccessToken = (state:RootState)=> {
  const accessTokenString: string | null = state.auth.data.accessToken;
  const accessToken = JSON.parse(accessTokenString ?? "")?.accessToken || "";
  return accessToken;
}

export const selectIsLoggedIn = () => {
  const  accessToken = localStorage.getItem("accessToken");
  return accessToken ? true : false;
};

export const authReducer = authSlice.reducer;
