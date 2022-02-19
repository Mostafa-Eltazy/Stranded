import { clearAuthToken } from "../../util/token-storage";

const actions = {
  LOGIN_START: "fetch_user_data",
  LOGIN_PASS: "user_passed",
  LOGIN_FAIL: "user_failed",
  LOGOUT: "user_removed",
};

const USER_REDUCER = (state, action) => {
  switch (action.type) {
    case actions.LOGIN_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case actions.LOGIN_PASS: {
      const { data } = action;
      return {
        ...state,
        user: data,
        isFetching: false,
        error: false,
      };
    }
    case actions.LOGIN_FAIL: {
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true,
      };
    }
    case actions.LOGOUT: {
      clearAuthToken();
      return {
        ...state,
        user: null,
        isFetching: false,
        error: false,
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { actions, USER_REDUCER };
