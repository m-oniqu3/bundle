import { Board, Column, Row } from "../types";

export enum ActionEnum {
  CREATE_BOARD = "CREATE_BOARD",
  SET_ACTIVE_BOARD = "SET_ACTIVE_BOARD",
  CREATE_COLUMN = "CREATE_COLUMN",
  DELETE_COLUMN = "DELETE_COLUMN",
  EDIT_COLUMN_NAME = "EDIT_COLUMN_NAME",
  CREATE_ROW = "CREATE_ROW",
}

export interface CreateBoardAction {
  type: ActionEnum.CREATE_BOARD;
  payload: string;
}

export interface SetActiveBoardAction {
  type: ActionEnum.SET_ACTIVE_BOARD;
  payload: Board;
}

export interface CreateColumnAction {
  type: ActionEnum.CREATE_COLUMN;
  payload: { activeBoardID: number; columnName: string };
}

export interface DeleteColumnAction {
  type: ActionEnum.DELETE_COLUMN;
  payload: { activeBoardID: number; columnID: Column["id"] };
}

export interface CreateRowAction {
  type: ActionEnum.CREATE_ROW;
  payload: { activeBoardID: number; columnID: number; row: Row };
}

export interface EditColumnNameAction {
  type: ActionEnum.EDIT_COLUMN_NAME;
  payload: { activeBoardID: number; columnID: number; newColumnName: string };
}

export type Actions =
  | CreateBoardAction
  | SetActiveBoardAction
  | CreateColumnAction
  | DeleteColumnAction
  | CreateRowAction
  | EditColumnNameAction;
