import { useBoardContext } from "../context/useBoardContext";
import Panel from "./Panel";

function Columns() {
  const {
    state: { activeBoard, boards },
  } = useBoardContext();

  const columnsForActiveBoard = activeBoard ? boards[activeBoard] : [];

  const renderedColumns = columnsForActiveBoard.map((col) => {
    return <Panel key={col.name} column={col} />;
  });

  return <div className="flex gap-6 min-h-80 w-full">{renderedColumns}</div>;
}

export default Columns;
