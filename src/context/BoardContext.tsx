import { createContext, useReducer } from "react";
import { ActionTypes } from "./actions";
import { initialState } from "./initialState";
import reducer, { State } from "./reducer";

interface ContextVales {
  state: State;
  dispatch: React.Dispatch<ActionTypes>;
}

export const BoardContext = createContext<ContextVales | null>(null);

function BoardContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}

export default BoardContextProvider;
