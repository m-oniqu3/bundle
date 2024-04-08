import { createContext, useReducer } from "react";
import reducer, { Actions, State, initalState } from "./reducer";

interface ContextVales {
  state: State;
  dispatch: React.Dispatch<Actions>;
}

export const BoardContext = createContext<ContextVales | null>(null);

function BoardContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  console.log(state);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}

export default BoardContextProvider;
