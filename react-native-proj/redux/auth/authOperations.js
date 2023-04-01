import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../../firebase/config";

export const authSignUpUser = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkAPI) => {
    try {
      console.log(credentials);
      const user = await signInWithEmailAndPassword(
        db,
        credentials.email,
        credentials.password
      );
      console.log("user", user);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSignInUser = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkAPI) => {
    try {
      console.log(credentials);
      const user = await createUserWithEmailAndPassword(
        db,
        credentials.email,
        credentials.password
      );
      console.log("user", user);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
