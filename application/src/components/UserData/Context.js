import React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";
import { useToken } from "../CustomHooks/useToken";
import { USER_REDUCER } from "./Reducer";
import { actions } from "./Reducer";

const INTIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

export const User_Context = createContext({ INTIAL_STATE });
export const UserContextProvider = ({ children }) => {
  const [USER_Context_State, dispatch] = useReducer(USER_REDUCER, INTIAL_STATE);

  return (
    <User_Context.Provider
      value={{
        USER_Context_State,
        dispatch,
      }}
    >
      {children}
    </User_Context.Provider>
  );
};

export function useUserContext() {
  const context = useContext(User_Context);
  // const { dispatch } = useUserContext();

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  // const [token] = useToken();
  // const getPayLoadFromToken = (token) => {
  //   const encodedPayLoad = token.split(".")[1];
  //   return JSON.parse(atob(encodedPayLoad));
  // };
  // useEffect(() => {
  //   if (token) {
  //     dispatch({ type: actions.LOGIN_PASS, getPayLoadFromToken });
  //   }
  // }, [token]);

  return context;
}

// export const useUser = () => {
//   const { USER_Context_State, dispatch } = useUserContext();
//   const [token] = useToken();
//   const getPayLoadFromToken = (token) => {
//     const encodedPayLoad = token.split(".")[1];
//     return JSON.parse(atob(encodedPayLoad));
//   };
//   if (!token) {
//       dispatch({ type: actions.LOGIN_PASS, data:null });
//     } else {
//       dispatch({ type: actions.LOGIN_PASS, getPayLoadFromToken });
//     }

// };
// const { USER_Context_State, dispatch } = context;

// const [token] = useToken();
// const getPayLoadFromToken = (token) => {
//   const encodedPayLoad = token.split(".")[1];
//   return JSON.parse(atob(encodedPayLoad));
// };

// if (!token) {
//   return context;
// } else {
//   dispatch({ type: actions.LOGIN_PASS, getPayLoadFromToken });
// }
// useEffect(()=>{
//   if (!token){
//     dispatch({ type: actions.LOGIN_PASS, data:null });
//   } else {
//     dispatch({ type: actions.LOGIN_PASS, getPayLoadFromToken });
//   }
// },[token]);
