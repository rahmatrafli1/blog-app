import { combineReducers } from "redux";
import PostReducer from "./posts";
import ContactReducer from "./contact";

export default combineReducers({
  PostReducer,
  ContactReducer,
});
