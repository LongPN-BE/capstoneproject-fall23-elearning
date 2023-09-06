import { combineReducers } from "redux";
import LoadingReducer from "./reducer-implement/LoadingReducer";
import AccountReducer from "./reducer-implement/AccountReducer";

export default combineReducers({
  LoadingReducer,
  AccountReducer,
});
