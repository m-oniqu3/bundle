import { useContext } from "react";
import { BoardContext } from "./BoardContext";

export function useBoardContext() {
  const context = useContext(BoardContext);

  if (context === null) {
    throw new Error("Cannot use BoardContext outside its Provider");
  }

  return context;
}
