import { Reducer } from "react";
import { Column, Row } from "../types";
import { ActionEnum, Actions } from "./actions";

interface Rows {
  [boardname: string]: {
    [columnID: number]: Row[];
  };
}
export interface State {
  boards: Set<string>;
  columns: Record<string, Column[]>; // key is board name
  rows: Rows;
  activeBoard: string | null;
}

export const initalState: State = {
  activeBoard: null,
  boards: new Set(["Development", "Testing", "Deployment"]),
  columns: {
    Development: [
      { name: "To Do", id: 1, colour: "#EAEAEA" },
      { name: "In Progress", id: 2, colour: "#ACBEA3" },
      { name: "Code Review", id: 3, colour: "#DFF8EB" },
    ],
    Testing: [
      { name: "To Test", id: 4, colour: "#FECEF1" },
      { name: "In Progress", id: 5, colour: "#9DD9D2" },
      { name: "Done", id: 6, colour: "#FFEAEC" },
    ],
    Deployment: [
      { name: "Pending", id: 7, colour: "#F39A9D" },
      { name: "In Progress", id: 8, colour: "#C0E0DE" },
      { name: "Done", id: 9, colour: "#DAD4EF" },
    ],
  },
  rows: {
    Development: {
      1: [
        { id: 11, content: "Setup project" },
        { id: 12, content: "Implement authentication" },
      ],
      2: [{ id: 13, content: "Refactor codebase" }],
    },
    Testing: {
      4: [{ id: 14, content: "Write unit tests" }],
      5: [{ id: 15, content: "Perform integration testing" }],
    },
    Deployment: { 7: [{ id: 16, content: "Prepare deployment scripts" }] },
  },
};

const reducer: Reducer<State, Actions> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionEnum.CREATE_BOARD:
      return Object.assign({}, state, {
        boards: new Set([...state.boards, payload]),
      });

    case ActionEnum.SET_ACTIVE_BOARD:
      return Object.assign({}, state, { activeBoard: payload });

    case ActionEnum.CREATE_COLUMN: {
      const columnID = Date.now();

      return {
        ...state,
        columns: {
          ...state.columns,
          [payload.activeBoard]: [
            ...(state.columns[payload.activeBoard] ?? []),
            { id: columnID, name: payload.columnName, colour: "#D0FEF5" },
          ],
        },
        rows: {
          ...state.rows,
          [payload.activeBoard]: {
            ...state.rows[payload.activeBoard],
            [columnID]: [],
          },
        },
      };
    }

    case ActionEnum.DELETE_COLUMN: {
      // clone columns for active board
      const columnsForActiveBoard = state.columns[payload.activeBoard].concat(
        []
      );

      // get index for the given column
      const columnIndex = columnsForActiveBoard.findIndex(
        (col) => col.id === payload.columnID
      );

      // remove column at that index
      columnsForActiveBoard.splice(columnIndex, 1);

      // clone rows and del
      const rows = Object.assign({}, state.rows[payload.activeBoard]);
      delete rows[payload.columnID];

      return {
        ...state,
        columns: {
          ...state.columns,
          [payload.activeBoard]: columnsForActiveBoard,
        },
        rows: {
          ...state.rows,
          [payload.activeBoard]: rows,
        },
      };
    }
    case ActionEnum.CREATE_ROW:
      return state;

    default:
      return state;
  }
};

export default reducer;
