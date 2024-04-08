import { Reducer } from "react";
import { Boards } from "../types";

export enum ActionEnum {
  CREATE_BOARD = "CREATE_BOARD",
  SET_ACTIVE_BOARD = "SET_ACTIVE_BOARD",
}

export interface State {
  boards: Boards;
  activeBoard: string;
}

export interface CreateBoardAction {
  type: ActionEnum.CREATE_BOARD;
  payload: string;
}

export interface SetActiveBoardAction {
  type: ActionEnum.SET_ACTIVE_BOARD;
  payload: string;
}

export type Actions = CreateBoardAction | SetActiveBoardAction;

/*
const newState = Object.assign({}, state, {
  nestedObject: Object.assign({}, state.nestedObject, {
    nestedProperty: newValue
  })
});
*/

export const initalState: State = {
  activeBoard: "",
  boards: {
    tasks: [
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
    finished: [
      {
        name: "Done",
        color: "orange",
        tasks: [{ id: "row5", title: "Deploy to production" }],
      },
    ],
  },
};

const reducer: Reducer<State, Actions> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionEnum.CREATE_BOARD:
      return Object.assign({}, state, {
        boards: Object.assign({}, state.boards, { [payload]: [] }),
      });

    case ActionEnum.SET_ACTIVE_BOARD:
      return Object.assign({}, state, { activeBoard: payload });

    default:
      return state;
  }
};

export default reducer;
