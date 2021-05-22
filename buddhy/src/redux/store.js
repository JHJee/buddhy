import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import signinReducer from './signinSlice';
import signupReducer from './signupSlice';

export default configureStore({
  reducer: {
    signin: signinReducer,
    signup: signupReducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
});
