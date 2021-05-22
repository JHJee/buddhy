import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const SLICE_NAME = 'example';

export const getUsers = createAsyncThunk(
  `${SLICE_NAME}/getUsers`, // action name
  async () => {
    try {
      const response = await axios.post(API_URL, {
        userId: 1,
        id: 1,
        title: 'hmm',
        completed: false,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw Error(error);
    }
  },
);

export const exampleSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isSignedIn: false,
    loading: false,
    userData: {},
    error: null,
  },
  reducers: {
    signout: state => {
      state = initialState;
    },
  },
  extraReducers: {
    [getUsers.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isSignedIn = true;
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const selectSignInStatus = state => state.isSignedIn;
export const selectIsLoading = state => state.loading;
export const { signout } = exampleSlice.actions;
export default exampleSlice.reducer;
