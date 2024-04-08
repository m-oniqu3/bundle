export interface Rows {
  id: string;
  title: string;
}

export interface Column {
  name: string;
  colour: string;
  rows: Rows[];
}

export interface Board {
  [columnName: string]: Column[];
}

export interface Boards {
  [boardName: string]: Column[];
}
