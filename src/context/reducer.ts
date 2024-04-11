import { Reducer } from "react";
import { Board, Column, Row } from "../types";
import { ActionTypes, Actions } from "./actions";

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

const reducer: Reducer<State, ActionTypes> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case Actions.CREATE_BOARD: {
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

    case Actions.DELETE_BOARD: {
      const boards = state.boards
        .concat([])
        .filter((board) => board.id !== payload);
      const columnsForBoard = { ...state.columns };
      const rowsForBoard = { ...state.rows };

      // const boardIndex = boards.findIndex((board) => board.id === payload);

      // if (boardIndex === -1) {
      //   console.log("Could not delete board");
      //   return state;
      // }

      // boards.splice(boardIndex, 1);
      delete columnsForBoard[payload];
      delete rowsForBoard[payload];

      return {
        ...state,
        activeBoard: boards[0] ?? null,
        boards,
        columns: columnsForBoard,
        rows: rowsForBoard,
      };
    }

    case Actions.EDIT_BOARD_NAME: {
      const boards = state.boards.concat([]);

      const board = boards.find((board) => board.id === payload.activeBoardID);

      if (!board) {
        console.log("Could not edit board name");
        return state;
      }

      board.name = payload.newBoardName;

      return { ...state, boards };
    }

    case Actions.SET_ACTIVE_BOARD:
      return Object.assign({}, state, { activeBoard: payload });

    case Actions.CREATE_COLUMN: {
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

    case Actions.DELETE_COLUMN: {
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

    case Actions.EDIT_COLUMN_NAME: {
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

    case Actions.CREATE_ROW: {
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

    case Actions.DELETE_ROW: {
      const columnsForBoard = state.rows[payload.activeBoardID];
      const rowsForColumn = columnsForBoard[payload.columnID].concat([]);

      //index of row
      const rowIndex = rowsForColumn.findIndex(
        (row) => row.id === payload.rowID
      );

      if (rowIndex === -1) {
        console.log("Could not find row to delete");
        return state;
      }

      //delete the row

      rowsForColumn.splice(rowIndex, 1);

      return {
        ...state,
        rows: {
          ...state.rows,
          [payload.activeBoardID]: {
            ...state.rows[payload.activeBoardID],
            [payload.columnID]: rowsForColumn,
          },
        },
      };
    }

    case Actions.EDIT_ROW: {
      const columnsForBoard = state.rows[payload.activeBoardID];
      const rowsForColumn = columnsForBoard[payload.columnID].concat([]);

      // find the row
      const row = rowsForColumn.find((row) => row.id === payload.rowID);

      if (!row) {
        console.log("Could not find row to update");
        return state;
      }

      row["content"] = payload.newContent;

      return {
        ...state,
        rows: {
          ...state.rows,
          [payload.activeBoardID]: {
            ...state.rows[payload.activeBoardID],
            [payload.columnID]: rowsForColumn,
          },
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
