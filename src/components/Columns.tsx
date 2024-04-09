import { useBoardContext } from "../context/useBoardContext";
import Panel from "./Panel";

function Columns() {
  const {
    state: { activeBoard, columns },
  } = useBoardContext();

  const columnsForActiveBoard = activeBoard
    ? columns[activeBoard]
      ? columns[activeBoard]
      : []
    : [];

  const renderedColumns = columnsForActiveBoard.map((col) => {
    return <Panel key={col.id} column={col} />;
  });

  return <div className="flex gap-6 min-h-80 w-full">{renderedColumns}</div>;
}

export default Columns;
