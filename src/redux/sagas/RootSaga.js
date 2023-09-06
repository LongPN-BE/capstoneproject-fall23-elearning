import { all } from "redux-saga/effects";
import * as accountSaga from "./saga-implement/AccountSaga";

export default function* rootSaga() {
  yield all([accountSaga.followActionGetAllAccount()]);
}
