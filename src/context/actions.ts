import { Board, Column, Row } from "../types";

export enum Actions {
  CREATE_BOARD = "CREATE_BOARD",
  DELETE_BOARD = "DELETE_BOARD",
  EDIT_BOARD_NAME = "EDIT_BOARD_NAME",
  SET_ACTIVE_BOARD = "SET_ACTIVE_BOARD",

  CREATE_COLUMN = "CREATE_COLUMN",
  DELETE_COLUMN = "DELETE_COLUMN",
  EDIT_COLUMN_NAME = "EDIT_COLUMN_NAME",
  MOVE_COLUMN = "MOVE_COLUMN",

  CREATE_ROW = "CREATE_ROW",
  DELETE_ROW = "DELETE_ROW",
  EDIT_ROW = "EDIT_ROW",
  MOVE_ROW = "MOVE_ROW",
}

export interface CreateBoardAction {
  type: Actions.CREATE_BOARD;
  payload: string;
}

export interface DeleteBoardAction {
  type: Actions.DELETE_BOARD;
  payload: Board["id"];
}

export interface EditBoardAction {
  type: Actions.EDIT_BOARD_NAME;
  payload: {
    activeBoardID: Board["id"];
    newBoardName: Board["name"];
  };
}

export interface SetActiveBoardAction {
  type: Actions.SET_ACTIVE_BOARD;
  payload: Board;
}

export interface CreateColumnAction {
  type: Actions.CREATE_COLUMN;
  payload: { activeBoardID: number; columnName: string };
}

export interface DeleteColumnAction {
  type: Actions.DELETE_COLUMN;
  payload: { activeBoardID: number; columnID: Column["id"] };
}
export interface EditColumnNameAction {
  type: Actions.EDIT_COLUMN_NAME;
  payload: { activeBoardID: number; columnID: number; newColumnName: string };
}

export interface CreateRowAction {
  type: Actions.CREATE_ROW;
  payload: { activeBoardID: number; columnID: number; row: Row };
}

export interface DeleteRowAction {
  type: Actions.DELETE_ROW;
  payload: {
    activeBoardID: number;
    columnID: number;
    rowID: number;
  };
}

export interface EditRowAction {
  type: Actions.EDIT_ROW;
  payload: {
    activeBoardID: number;
    columnID: number;
    rowID: number;
    newContent: string;
  };
}

export interface MoveRowAction {
  type: Actions.MOVE_ROW;
  payload: {
    activeBoardID: number;
    draggedRow: { columnID: number; rowID: number };
    dropTarget: { columnID: number; rowID: number };
  };
}

export interface MoveColumnAction {
  type: Actions.MOVE_COLUMN;
  payload: {
    activeBoardID: number;
    draggedColumnID: number;
    targetColumnID: number;
  };
}

export type ActionTypes =
  | CreateBoardAction
  | DeleteBoardAction
  | EditBoardAction
  | SetActiveBoardAction
  | CreateColumnAction
  | DeleteColumnAction
  | MoveColumnAction
  | CreateRowAction
  | EditColumnNameAction
  | DeleteRowAction
  | EditRowAction
  | MoveRowAction;
