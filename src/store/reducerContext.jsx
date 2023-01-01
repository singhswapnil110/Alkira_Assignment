import { createContext, useReducer } from "react";
import { initialState } from "../constants/constants";
import { reducer } from "./reducer";

export const ReducerContext = createContext();

export const ReducerContextWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      {children}
    </ReducerContext.Provider>
  );
};
