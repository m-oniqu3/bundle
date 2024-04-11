import { useEffect, useRef, useState } from "react";
import { Actions, CreateRowAction } from "../context/actions";
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

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    dispatch,
    state: { activeBoard, rows },
  } = useBoardContext();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "";

      textAreaRef.current.style.height = 30 + "px";

      textAreaRef.current.selectionStart = textAreaRef.current.value.length;
    }
  }, [showForm]);

  useEffect(() => {
    function detectClickOutside(e: MouseEvent) {
      if (
        textAreaRef.current &&
        !textAreaRef.current.contains(e.target as Node)
      ) {
        setShowForm(false);
        // setEntry("");
      }
    }

    document.addEventListener("mousedown", detectClickOutside);

    return () => document.removeEventListener("mousedown", detectClickOutside);
  }, []);

  function handlePosition(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    setPosition({ x: e.pageX, y: e.pageY });
    setIsOpenMenu((state) => !state);
  }

  function handleFormVisibility() {
    setShowForm((state) => !state);
  }

  // resize text area on input
  function handleTextArea(e: React.FormEvent<HTMLTextAreaElement>) {
    e.currentTarget.style.height = "auto";

    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  }

  function handleSubmit(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    if (!entry) return;

    if (!activeBoard) {
      console.log("active board is needed to add new row to column");
      return;
    }

    const create_row: CreateRowAction = {
      type: Actions.CREATE_ROW,
      payload: {
        activeBoardID: activeBoard.id,
        columnID: id,
        row: { id: Date.now(), content: entry },
      },
    };

    dispatch(create_row);
    setEntry("");

    if (textAreaRef.current) {
      textAreaRef.current.style.height = 30 + "px";
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key.toLowerCase() === "enter") {
      handleSubmit(e);
    }
  }

  const rowsForBoard = activeBoard ? rows[activeBoard.id] : [];
  const rowsForColumn = rowsForBoard[id] ?? [];

  const cards = rowsForColumn.map((row) => {
    return <Card key={row.id} row={row} columnID={id} />;
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
          <form>
            <textarea
              ref={textAreaRef}
              value={entry}
              onInput={handleTextArea}
              onChange={(e) => setEntry(e.target.value)}
              onKeyDown={handleKeyPress}
              className="min-h-9 p-2 border border-gray-200 rounded-md w-full text-sm focus:outline-none resize-none"
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
          setPosition={setPosition}
          closeMenu={() => setIsOpenMenu(false)}
          column={{ name, colour, id }}
        />
      )}
    </>
  );
}

export default Panel;
