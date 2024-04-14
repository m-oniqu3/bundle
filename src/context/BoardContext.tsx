import { createContext, useReducer } from "react";
import { ActionTypes } from "./actions";

import reducer, { State } from "./reducer";

interface ContextVales {
  state: State;
  dispatch: React.Dispatch<ActionTypes>;
}

export const BoardContext = createContext<ContextVales | null>(null);

function BoardContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    boards: [],
    columns: {},
    rows: {},
    activeBoard: null,
  });

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}

export default BoardContextProvider;
