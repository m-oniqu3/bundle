export interface Row {
  id: number;
  content: string;
}

export interface Column {
  id: number;
  name: string;
  colour: string;
}

export interface Board {
  name: string;
  id: number;
}

export interface Transfer {
  columnid: string;
  rowid: string;
}
