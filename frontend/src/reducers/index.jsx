import { combineReducers } from "redux";
import PostReducer from "./posts";
import ContactReducer from "./contact";
import LoginReducer from "./login";
import RegisterReducer from "./register";

export default combineReducers({
  PostReducer,
  ContactReducer,
  LoginReducer,
  RegisterReducer,
});
