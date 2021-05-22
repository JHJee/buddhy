import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SIGNIN_API_URL = 'http://api.untitled.com/api/auth/login/';
const SIGNOUT_API_URL = 'http://api.untitled.com/api/auth/logout/';
const SLICE_NAME = 'signin';

export const signin = createAsyncThunk(
  `${SLICE_NAME}/signin`, // signin action
  async signinData => {
    try {
      const response = await axios.post(SIGNIN_API_URL, {
        email: signinData.email,
        password: signinData.password,
      });
      return response.data;
    } catch (error) {
      // console.error(error);
      var errorStr = JSON.stringify(error.response.data);
      console.log('ERROR: ' + errorStr);
      if (errorStr.indexOf('email') != -1) {
        throw Error('올바른 이메일 형식이 아닙니다');
      } else {
        throw Error('이메일 또는 비밀번호가 일치하지 않습니다');
      }
    }
  },
);

export const signout = createAsyncThunk(
  `${SLICE_NAME}/signout`, // signout action
  async userToken => {
    try {
      const response = await axios.post(SIGNOUT_API_URL, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      var errorStr = JSON.stringify(error.response.data);
      console.log('ERROR: ' + errorStr);
      throw Error('로그아웃에 실패했습니다');
    }
  },
);

export const signinSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isSignedIn: false,
    nickname: null,
    userType: 0,
    loading: false,
    userData: {},
    error: null,
  },
  reducers: {},
  extraReducers: {
    [signin.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [signin.fulfilled]: (state, action) => {
      state.isSignedIn = true;
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
    },
    [signin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [signout.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [signout.fulfilled]: (state, action) => {
      state.isSignedIn = false;
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
    },
    [signout.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const getIsSignedIn = signinSlice.isSignedIn;
export const getLoading = signinSlice.loading;
export const getError = signinSlice.error;
// export const { signout } = signinSlice.actions;
export default signinSlice.reducer;
