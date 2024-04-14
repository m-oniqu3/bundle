import { useBoardContext } from "../context/useBoardContext";
import Columns from "./Columns";
import Header from "./Header";
import NewColumn from "./NewColumn";

function BoardView() {
  const {
    state: { activeBoard, columns },
  } = useBoardContext();

  // check if activeBoard is has columns
  const columnsForBoard = activeBoard ? columns[activeBoard.id] : [];

  const styles = columnsForBoard.length > 0 ? "gap-4" : "";

  return (
    <>
      <Header />

      <div className="p-4 grid grid-cols-8 overflow-x-scroll no-scrollbar w-full">
        <div
          className={`flex grid-cols-1 md:col-start-4 md:col-span-full h-full w-fit ${styles}`}
        >
          <Columns />
          <NewColumn />
        </div>
      </div>
    </>
  );
}

export default BoardView;
