import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegun } from "./api";
import httpService from "../utils/httpService";

const slice = createSlice({
    name: "zoom",
    initialState: {
      access: localStorage.getItem("access_token"),
      refresh: localStorage.getItem("refresh_token"),
      isAuthenticated: false,
      loading: false,
      error: null,
    },
    reducers: {
      authStarted: (zoom, action) => {
        zoom.loading = true;
      },

      authSuccess: (zoom, action) => {
        localStorage.setItem("access_token", action.payload.access);
        localStorage.setItem("refresh_token", action.payload.refresh);
  
        zoom.isAuthenticated = true;
        zoom.access = action.payload.access;
        zoom.refresh = action.payload.refresh;
        zoom.loading = false;
        zoom.error = null;
      },

      authFailed: (auth, action) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
  
        auth.isAuthenticated = false;
        auth.access = null;
        auth.refresh = null;
        auth.error = action.payload;
        auth.loading = false;
      },
    },
});

const {
    authStarted,
    authSuccess,
    authFailed
} = slice.actions;

export default slice.reducer;

export const startAuth = () => (dispatch) => {
    const access = localStorage.getItem("access");
  
    if (access) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `JWT ${access}`,
        Accept: "application/json",
      };
  
      dispatch(
        apiCallBegun({
          url: "/zoom/redirect/",
          method: "GET",
          headers,
          onStart: authStarted.type,
          onSuccess: authSuccess.type,
          onError: authFailed.type,
        })
      );
    } else {
      dispatch(authFailed());
    }
};