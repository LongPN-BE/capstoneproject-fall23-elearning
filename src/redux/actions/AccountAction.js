import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const getAllAccount = createActions({
  getAllAccountRequest: undefined,
  getAllAccountSuccess: (payload) => payload,
  getAllAccountFailure: (err) => err,
});
