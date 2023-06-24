import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const data = localStorage.getItem('token') ?? '';
const parsedData:{token:string} = data? JSON.parse(data) :null
const initialState={
    data:parsedData ?? {
        token:'', 
    },
    isLoggedIn:data?true:false
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
          state.isLoggedIn = true
       },
       clearToken(state){
        state.data={
            token:''
        }
        state.isLoggedIn=false
        localStorage.removeItem('authToken')
       }
   }
})

export const {setToken,clearToken}=studentAuthSlice.actions

export const selectStudentAuth=(state:RootState)=>state.studentAuth.data
export const selectIsStudentLoggedIn = (state: RootState) => state.studentAuth.isLoggedIn;


export const userAuthReducer =studentAuthSlice.reducer;