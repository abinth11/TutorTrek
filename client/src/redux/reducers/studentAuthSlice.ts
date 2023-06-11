import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const data = localStorage.getItem('token') ?? '';
const parsedData:{token:string} = data? JSON.parse(data) :null
const initialState={
    data:parsedData ?? {
        token:'', 
    }
}

const studentAuthSlice=createSlice({
   name:'students',
   initialState,
   reducers:{
       setToken(state,action:PayloadAction<{token:string}>){
          localStorage.setItem(
            'authToken',
            JSON.stringify({
                token:action.payload.token,
            })
          )
          state.data = {token:action.payload.token}
       },
       clearToken(state){
        state.data={
            token:''
        }
        localStorage.removeItem('authToken')
       }
   }
})

export const {setToken,clearToken}=studentAuthSlice.actions

export const selectStudentAuth=(state:RootState)=>state.studentAuth.data

export const userAuthReducer =studentAuthSlice.reducer;