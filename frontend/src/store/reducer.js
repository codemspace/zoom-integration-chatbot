import { combineReducers } from "redux";
import authReducer from "./auth";
import zoomReducer from "./zoom";

export default combineReducers({
  auth: authReducer,
  zoom: zoomReducer
});
