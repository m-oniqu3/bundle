import { useEffect, useRef, useState } from "react";
import { Actions, CreateColumnAction } from "../context/actions";
import { useBoardContext } from "../context/useBoardContext";
import { AddIcon } from "../icons";

function NewColumn() {
  const [value, setValue] = useState("");
  const [positions, setPositions] = useState({ x: 0, y: 0 });
  const [displayForm, setDisplayForm] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const {
    state: { activeBoard, columns },
    dispatch,
  } = useBoardContext();

  function handlePositions(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setPositions({
      x: e.pageX,
      y: e.pageY,
    });

    setDisplayForm((state) => !state);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(activeBoard);

    if (!value || !activeBoard) return;

    //does already exist in board
    const isDuplicateColumn = columns[activeBoard.id].find(
      (col) => col.name.toLowerCase() === value.toLowerCase()
    );

    if (isDuplicateColumn) {
      console.log("column already exist");
      return;
    }

    const create_column: CreateColumnAction = {
      type: Actions.CREATE_COLUMN,
      payload: {
        activeBoardID: activeBoard.id,
        columnName: value,
      },
    };

    dispatch(create_column);
    setValue("");
    setDisplayForm(false);
  }

  useEffect(() => {
    function detectClick(e: MouseEvent) {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setDisplayForm(false);
      }
    }
    document.addEventListener("mousedown", detectClick);

    return () => document.removeEventListener("mousedown", detectClick);
  }, []);

  useEffect(() => {
    function positionElement() {
      if (!formRef.current) return;

      const width = window.innerWidth;
      const formWidth = formRef.current.clientWidth;

      // if form is going to overflow the right side of the screen
      // place it right at the edge else place it where the user clicked
      if (positions.x + formWidth > width) {
        formRef.current.style.right = "0";
      } else {
        formRef.current.style.left = `${positions.x}px `;
      }
    }

    positionElement();
  }, [positions]);

  return (
    <div className="min-w-60">
      <button
        onClick={handlePositions}
        className="relative -top-2 cursor-pointer bg-gray-100 rounded-md p-2"
      >
        <AddIcon />
      </button>

      {displayForm && (
        <form
          ref={formRef}
          className="w-72 mt-4 flex gap-2 items-center absolute "
          onSubmit={handleSubmit}
          style={{ top: positions.y + 15 }}
        >
          <input
            autoFocus
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:outline-none block w-full px-3 py-2"
            placeholder="Name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />

          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 me-2  "
          >
            Create
          </button>
        </form>
      )}
    </div>
  );
}

export default NewColumn;
