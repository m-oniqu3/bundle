export interface Task {
  id: string;
  title: string;
}

export interface Column {
  name: string;
  color: string;
  tasks: Task[];
}

export interface Board {
  [columnName: string]: Column[];
}

export interface Boards {
  [boardName: string]: Column[];
}
