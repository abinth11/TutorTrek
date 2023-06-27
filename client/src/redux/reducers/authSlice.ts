import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const accessToken = localStorage.getItem('accessToken');
// const refreshToken = localStorage.getItem('refreshToken')
const initialState={
    data:{
        accessToken:'',
        refreshToken:'' 
    },
    isLoggedIn:accessToken?true:false
}

const authSlice=createSlice({
   name:'auth',
   initialState,
   reducers:{
       setToken(state,action:PayloadAction<{accessToken:string,refreshToken:string}>){
          localStorage.setItem(
            'accessToken',
            JSON.stringify({
                accessToken:action.payload.accessToken,
            })
          )
          localStorage.setItem(
            'refreshToken',
            JSON.stringify({
                refreshToken:action.payload.refreshToken,
            })
          )
          state.data = {accessToken:action.payload.accessToken,refreshToken:action.payload.refreshToken}
          state.isLoggedIn = true
       },
       clearToken(state){
        state.data={
            accessToken:'',
            refreshToken:''
        }
        state.isLoggedIn=false
        localStorage.removeItem('accessToken')
       }
   }
})

export const {setToken,clearToken}=authSlice.actions

export const selectAuth=(state:RootState)=>state.auth.data
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;


export const authReducer =authSlice.reducer;