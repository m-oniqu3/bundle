import { useState } from "react";
import { ActionEnum, CreateRowAction } from "../context/actions";
import { useBoardContext } from "../context/useBoardContext";
import { AddIcon, EllipsisIcon } from "../icons";
import { Column } from "../types";
import Card from "./Card";
import PanelOptions from "./PanelOptions";

interface Props {
  column: Column;
}

function Panel(props: Props) {
  const {
    column: { name, colour, id },
  } = props;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsOpenMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [entry, setEntry] = useState("");
  const {
    dispatch,
    state: { activeBoard, rows },
  } = useBoardContext();

  function handlePosition(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    setPosition({ x: e.pageX, y: e.pageY });
    setIsOpenMenu((state) => !state);
  }

  function handleFormVisibility() {
    setShowForm((state) => !state);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!entry) return;

    if (!activeBoard) {
      console.log("active board is needed to add new row to column");
      return;
    }

    const create_row: CreateRowAction = {
      type: ActionEnum.CREATE_ROW,
      payload: {
        activeBoardID: activeBoard.id,
        columnID: id,
        row: { id: Date.now(), content: entry },
      },
    };

    dispatch(create_row);
    setEntry("");
  }

  const rowsForBoard = activeBoard ? rows[activeBoard.id] : [];
  const rowsForColumn = rowsForBoard[id] ?? [];

  const cards = rowsForColumn.map((row) => {
    return <Card key={row.id} row={row} />;
  });

  return (
    <>
      <div className="w-72 space-y-1">
        <header className="flex items-center gap-4 relative">
          <h3
            className="px-1 text-sm  rounded-sm"
            style={{ backgroundColor: colour }}
          >
            {name}
          </h3>
          <p className="text-sm">{rowsForColumn.length}</p>

          <div className="absolute right-0 flex items-center gap-1 cursor-pointer">
            <EllipsisIcon onClick={handlePosition} />

            <AddIcon />
          </div>
        </header>

        <ul className="flex flex-col gap-1 pt-2">{cards}</ul>

        {showForm && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="p-2 border border-gray-200 rounded-md w-full text-sm focus:outline-none  "
              autoFocus
            />
          </form>
        )}

        <button
          className="flex items-center gap-4 p-2 font-light hover:bg-slate-100 hover:rounded-md w-full"
          onClick={handleFormVisibility}
        >
          <AddIcon />
          <span className="text-sm">New</span>
        </button>
      </div>

      {isMenuOpen && (
        <PanelOptions
          position={position}
          closeMenu={() => setIsOpenMenu(false)}
          columnID={id}
        />
      )}
    </>
  );
}

export default Panel;
