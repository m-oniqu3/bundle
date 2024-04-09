export interface Row {
  id: number;
  content: string;
}

export interface Column {
  name: string;
  colour: string;
  rows: Row[];
}

export interface Board {
  [columnName: string]: Column[];
}

export interface Boards {
  [boardName: string]: Column[];
}
