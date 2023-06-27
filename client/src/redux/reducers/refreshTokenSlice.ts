// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../store';
// import { refreshTokenApi } from '../../api/endpoints/tokenRefresh'; // Import your API function for refreshing the token

// interface TokenRefreshState {
//   isRefreshing: boolean;
//   error: string | null;
// }

// const initialState: TokenRefreshState = {
//   isRefreshing: false,
//   error: null,
// };

// export const refreshToken = createAsyncThunk<string, void>(
//   'token/refresh',
//   async () => {
//     try {
//       const response = await refreshTokenApi();

//       return response.data.accessToken;
//     } catch (error) {
//       throw new Error('Token refresh failed');
//     }
//   }
// );

// const tokenRefreshSlice = createSlice({
//   name: 'token',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(refreshToken.pending, (state) => {
//       state.isRefreshing = true;
//       state.error = null;
//     });

//     builder.addCase(refreshToken.fulfilled, (state, action) => {
//       state.isRefreshing = false;
//       state.error = null;

//       localStorage.setItem('accessToken', action.payload); // Replace with your preferred storage method
//     });

//     builder.addCase(refreshToken.rejected, (state, action) => {
//       state.isRefreshing = false;
//       state.error = action.error.message as string;
//     });
//   },
// });

// export const tokenRefreshReducer = tokenRefreshSlice.reducer;

// export const selectTokenRefreshState = (state: RootState) => state.token;

// export default tokenRefreshSlice;

export const myname = 'abin'
