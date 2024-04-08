import { Reducer } from "react";
import { Boards } from "../types";

export enum ActionEmum {
  CREATE_BOARD = "CREATE_BOARD",
}

export interface State {
  boards: Boards;
}

export interface CreateBoardAction {
  type: ActionEmum.CREATE_BOARD;
  payload: string;
}

export type Actions = CreateBoardAction;

/*
const newState = Object.assign({}, state, {
  nestedObject: Object.assign({}, state.nestedObject, {
    nestedProperty: newValue
  })
});
*/

export const initalState: State = {
  boards: {
    "Board 1": [
      {
        name: "To Do",
        color: "blue",
        tasks: [
          { id: "row1", title: "Design UI" },
          { id: "row2", title: "Implement functionality" },
          { id: "row3", title: "Write tests" },
        ],
      },
      {
        name: "In Progress",
        color: "green",
        tasks: [{ id: "row4", title: "Refactor code" }],
      },
    ],
    "Board 2": [
      {
        name: "Done",
        color: "orange",
        tasks: [{ id: "row5", title: "Deploy to production" }],
      },
    ],
  },
};

const reducer: Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case ActionEmum.CREATE_BOARD:
      return Object.assign({}, state, {
        boards: Object.assign({}, state.boards, { [action.payload]: [] }),
      });
    default:
      return state;
  }
};

export default reducer;
