import { Reducer } from "react";
import { Board, Column, Row } from "../types";
import { ActionEnum, Actions } from "./actions";

interface Rows {
  [boardname: string]: {
    [columnID: number]: Row[];
  };
}
export interface State {
  boards: Board[];
  columns: Record<string, Column[]>; // key is board name
  rows: Rows;
  activeBoard: Board | null;
}

const reducer: Reducer<State, Actions> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionEnum.CREATE_BOARD: {
      const id = Date.now();
      return Object.assign({}, state, {
        boards: [...state.boards, { name: payload, id }],
        activeBoard: { name: payload, id },
        columns: {
          ...state.columns,
          [id]: [],
        },
      });
    }

    case ActionEnum.SET_ACTIVE_BOARD:
      return Object.assign({}, state, { activeBoard: payload });

    case ActionEnum.CREATE_COLUMN: {
      const columnID = Date.now();

      return {
        ...state,
        columns: {
          ...state.columns,
          [payload.activeBoardID]: [
            ...state.columns[payload.activeBoardID],
            { id: columnID, name: payload.columnName, colour: "#D0FEF5" },
          ],
        },
        rows: {
          ...state.rows,
          [payload.activeBoardID]: {
            ...state.rows[payload.activeBoardID],
            [columnID]: [],
          },
        },
      };
    }

    case ActionEnum.DELETE_COLUMN: {
      // clone columns for active board
      const columnsForActiveBoard = state.columns[payload.activeBoardID].concat(
        []
      );

      // get index for the given column
      const columnIndex = columnsForActiveBoard.findIndex(
        (col) => col.id === payload.columnID
      );

      // remove column at that index
      columnsForActiveBoard.splice(columnIndex, 1);

      // clone rows and del
      const rows = Object.assign({}, state.rows[payload.activeBoardID]);
      delete rows[payload.columnID];

      return {
        ...state,
        columns: {
          ...state.columns,
          [payload.activeBoardID]: columnsForActiveBoard,
        },
        rows: {
          ...state.rows,
          [payload.activeBoardID]: rows,
        },
      };
    }

    case ActionEnum.EDIT_COLUMN_NAME: {
      // clone columns in board
      const columns = state.columns[payload.activeBoardID].concat([]);

      //find column
      const column = columns.find((col) => col.id === payload.columnID);

      if (!column) {
        console.log("Could not edit column name");
        return state;
      }

      // update column name
      column.name = payload.newColumnName;

      return {
        ...state,
        columns: {
          ...state.columns,
          [payload.activeBoardID]: columns,
        },
      };
    }

    case ActionEnum.CREATE_ROW: {
      return {
        ...state,
        rows: {
          ...state.rows,
          [payload.activeBoardID]: {
            ...state.rows[payload.activeBoardID],
            [payload.columnID]: [
              ...(state.rows[payload.activeBoardID][payload.columnID] ?? []),
              payload.row,
            ],
          },
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
