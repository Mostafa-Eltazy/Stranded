const actions = {
  LOGIN_START: "fetch_user_data",
  LOGIN_PASS: "user_passed",
  LOGIN_FAIL: "user_failed",
};

// const status = {
// };
const USER_REDUCER = (state, action) => {
  switch (action.type) {
    case "fetch_user_data": {
      return {
        ...state,
        isFetching: true,
      };
    }
    case "user_passed": {
      const { data } = action;
      return {
        ...state,
        user: data,
        isFetching: false,
        error: false,
      };
    }
    case "user_failed": {
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true,
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { actions, USER_REDUCER };
