import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SIGNUP_API_URL = 'http://api.untitled.com/api/auth/signup';
const SLICE_NAME = 'signup';

export const signup = createAsyncThunk(
  `${SLICE_NAME}/signup`, // signiup action
  async signupData => {
    try {
      const response = await axios.post(SIGNUP_API_URL, {
        email: signupData.email,
        password1: signupData.password1,
        password2: signupData.password2,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      var errorStr = JSON.stringify(error.response.data);
      console.log('ERROR: ' + errorStr);
      throw Error(JSON.stringify(error.response.data));
      // if (errorStr.indexOf('email') != -1) {
      //   throw Error('올바른 이메일 형식이 아닙니다');
      // } else if (errorStr.indexOf('password') != -1) {
      //   throw Error('비밀번호를 다시 입력해 주세요');
      // } else {
      //   throw Error('기타 이유로 회원가입에 실패하였습니다');
      // }
    }
  },
);
export const checkDupEmail = () => {};
export const checkDupNickname = () => {};
export const verifyMobile = () => {};

export const signupSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isMobileVerified: true,
    hasUniqueEmail: true,
    hasUniqueNickname: true,
    loading: false,
    resData: {},
    error: null,
  },
  extraReducers: {
    // signup reducers
    [signup.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [signup.fulfilled]: (state, action) => {
      state.loading = false;
      state.resData = action.payload;
      state.error = null;
    },
    [signup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default signupSlice.reducer;
