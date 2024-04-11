import { Board, Column, Row } from "../types";

export enum Actions {
  CREATE_BOARD = "CREATE_BOARD",
  SET_ACTIVE_BOARD = "SET_ACTIVE_BOARD",
  CREATE_COLUMN = "CREATE_COLUMN",
  DELETE_COLUMN = "DELETE_COLUMN",
  EDIT_COLUMN_NAME = "EDIT_COLUMN_NAME",
  CREATE_ROW = "CREATE_ROW",
  DELETE_ROW = "DELETE_ROW",
  EDIT_ROW = "EDIT_ROW",
}

export interface CreateBoardAction {
  type: Actions.CREATE_BOARD;
  payload: string;
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

export type ActionTypes =
  | CreateBoardAction
  | SetActiveBoardAction
  | CreateColumnAction
  | DeleteColumnAction
  | CreateRowAction
  | EditColumnNameAction
  | DeleteRowAction
  | EditRowAction;
