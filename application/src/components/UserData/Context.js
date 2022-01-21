import React from "react";
import { createContext, useContext, useReducer } from "react";
import { USER_REDUCER } from "./Reducer";

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
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
