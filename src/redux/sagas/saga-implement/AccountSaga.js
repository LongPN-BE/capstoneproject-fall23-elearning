import { call, delay, put } from "redux-saga/effects";
import { takeLatest } from "redux-saga/effects";
import * as actions from "../../actions/AccountAction";

import AccountService from "../../../services/AccountService";
import { DISPLAY_LOADING, HIDE_LOADING, STATUS_CODE } from "../../../util/Constants";

function* getAllAccount() {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(2000);
    let listAccount = yield call(() => {
      return AccountService.getAllAccount();
    });
    if (listAccount.status === STATUS_CODE.SUCCESS) {
      yield put(actions.getAllAccount.getAllAccountSuccess(listAccount.data));
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.getAllAccount.getAllAccountFailure(error));
  }
}

export function* followActionGetAllAccount() {
  yield takeLatest(actions.getAllAccount.getAllAccountRequest, getAllAccount);
}
