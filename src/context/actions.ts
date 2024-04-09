import { Column, Row } from "../types";

export enum ActionEnum {
  CREATE_BOARD = "CREATE_BOARD",
  SET_ACTIVE_BOARD = "SET_ACTIVE_BOARD",
  CREATE_COLUMN = "CREATE_COLUMN",
  DELETE_COLUMN = "DELETE_COLUMN",
  CREATE_ROW = "CREATE_ROW",
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
  payload: { activeBoard: string; columnID: Column["id"] };
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
