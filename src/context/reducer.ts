import { Reducer } from "react";
import { Boards, Row } from "../types";

export enum ActionEnum {
  CREATE_BOARD = "CREATE_BOARD",
  SET_ACTIVE_BOARD = "SET_ACTIVE_BOARD",
  CREATE_COLUMN = "CREATE_COLUMN",
  DELETE_COLUMN = "DELETE_COLUMN",
  CREATE_ROW = "CREATE_ROW",
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

export interface CreateRowAction {
  type: ActionEnum.CREATE_ROW;
  payload: { activeBoard: string; columnName: string; row: Row };
}

export type Actions =
  | CreateBoardAction
  | SetActiveBoardAction
  | CreateColumnAction
  | DeleteColumnAction
  | CreateRowAction;

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
          { id: 1, content: "Design UI" },
          { id: 2, content: "Implement functionality" },
          { id: 3, content: "Write tests" },
        ],
      },
      {
        name: "In Progress",
        colour: "green",
        rows: [{ id: 4, content: "Refactor code" }],
      },
    ],
    finished: [
      {
        name: "Done",
        colour: "orange",
        rows: [{ id: 5, content: "Deploy to production" }],
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

    case ActionEnum.CREATE_ROW: {
      const column = state.boards[payload.activeBoard].find(
        (col) => col.name === payload.columnName
      );

      if (!column) {
        console.log("column does not exist");
        return;
      }

      // copy state
      return Object.assign({}, state, {
        // copy state.boards
        boards: Object.assign({}, state.boards, {
          [payload.activeBoard]: [
            // copy state.boards[board]
            Object.assign({}, state.boards[payload.activeBoard], {
              // [board][col]
              [payload.columnName]: [
                //copy [board][col]
                Object.assign({}, column, {
                  rows: [Object.assign({}, column.rows, payload.row)],
                }),
              ],
            }),
          ],
        }),
      });
    }

    default:
      return state;
  }
};

export default reducer;
