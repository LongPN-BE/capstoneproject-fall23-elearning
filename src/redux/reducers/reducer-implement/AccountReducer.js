import { getType, getAllAccount } from "../../actions/AccountAction";

const initialState = {
  data: {},
  isLoading: true,
};

export default function AccountReducer(state = initialState, action) {
  switch (action.type) {
    case getType(getAllAccount.getAllAccountRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getAllAccount.getAllAccountSuccess):
      console.log(action)
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getAllAccount.getAllAccountFailure):
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
