import { Reducer } from "react";
import { Boards } from "../types";

export enum ActionEnum {
  CREATE_BOARD = "CREATE_BOARD",
  SET_ACTIVE_BOARD = "SET_ACTIVE_BOARD",
  CREATE_COLUMN = "CREATE_COLUMN",
  DELETE_COLUMN = "DELETE_COLUMN",
}

export interface State {
  boards: Boards;
  activeBoard: string | null;
}

export interface CreateBoardAction {
  type: ActionEnum.CREATE_BOARD;
  payload: string;
}

export interface SetActiveBoardAction {
  type: ActionEnum.SET_ACTIVE_BOARD;
  payload: string;
}

export interface CreateColumnAction {
  type: ActionEnum.CREATE_COLUMN;
  payload: { activeBoard: string; columnName: string };
}

export interface DeleteColumnAction {
  type: ActionEnum.DELETE_COLUMN;
  payload: { activeBoard: string; columnName: string };
}

export type Actions =
  | CreateBoardAction
  | SetActiveBoardAction
  | CreateColumnAction
  | DeleteColumnAction;

/*
const newState = Object.assign({}, state, {
  nestedObject: Object.assign({}, state.nestedObject, {
    nestedProperty: newValue
  })
});
*/

export const initalState: State = {
  activeBoard: null,
  boards: {
    tasks: [
      {
        name: "To Do",
        colour: "blue",
        rows: [
          { id: "row1", content: "Design UI" },
          { id: "row2", content: "Implement functionality" },
          { id: "row3", content: "Write tests" },
        ],
      },
      {
        name: "In Progress",
        colour: "green",
        rows: [{ id: "row4", content: "Refactor code" }],
      },
    ],
    finished: [
      {
        name: "Done",
        colour: "orange",
        rows: [{ id: "row5", content: "Deploy to production" }],
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

    case ActionEnum.CREATE_COLUMN:
      // copy state
      return Object.assign({}, state, {
        // copy boards
        boards: Object.assign({}, state.boards, {
          [payload.activeBoard]: [
            // copy cols for active board & add new col
            ...state.boards[payload.activeBoard],
            { name: payload.columnName, colour: "pink", rows: [] },
          ],
        }),
      });

    case ActionEnum.DELETE_COLUMN: {
      // clone active board
      const columnsForActiveBoard = state.boards[payload.activeBoard].concat(
        []
      );

      // get index of column
      const columnIndex = state.boards[payload.activeBoard].findIndex(
        (el) => el.name === payload.columnName
      );

      if (columnIndex === -1) return state;

      // manipulate the clone
      // don't spread because splice returns array of deleted elements
      columnsForActiveBoard.splice(columnIndex, 1);

      return Object.assign({}, state, {
        boards: Object.assign({}, state.boards, {
          [payload.activeBoard]: columnsForActiveBoard,
        }),
      });
    }

    default:
      return state;
  }
};

export default reducer;
