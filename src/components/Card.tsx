import { useEffect, useRef, useState } from "react";
import { Actions, DeleteRowAction } from "../context/actions";
import { useBoardContext } from "../context/useBoardContext";
import { DeleteIcon, EditIcon, EllipsisVertical } from "../icons";
import { Column, Row } from "../types";

const options = [
  { id: 0, icon: <DeleteIcon />, name: "Delete Row", action: "delete" },
  { id: 1, icon: <EditIcon />, name: "Edit Row", action: "edit" },
];
interface Props {
  row: Row;
  columnID: Column["id"];
}

function Card(props: Props) {
  const { row, columnID } = props;
  const [isMenuOpen, setOpenMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLUListElement | null>(null);
  const [activeOption, setActiveOption] = useState(0);

  const {
    dispatch,
    state: { activeBoard },
  } = useBoardContext();

  function handleMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();

    setPosition({ x: e.pageX, y: e.pageY });
    setOpenMenu((state) => !state);
  }

  function handleActions(action: string) {
    if (action !== "delete" && action !== "edit") return;

    if (!activeBoard) {
      console.log("active board is needed to delete or edit row ");
      return;
    }

    if (action === "delete") {
      const delete_row: DeleteRowAction = {
        type: Actions.DELETE_ROW,
        payload: { activeBoardID: activeBoard.id, columnID, rowID: row.id },
      };

      dispatch(delete_row);
      setOpenMenu(false);
    }
  }

  useEffect(() => {
    function detectClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", detectClick);

    return () => document.removeEventListener("mousedown", detectClick);
  }, []);

  useEffect(() => {
    function positionElement() {
      if (!menuRef.current) return;

      const width = window.innerWidth;
      const formWidth = menuRef.current.clientWidth;

      // if menu is going to overflow the right side of the screen
      // place it right at the edge else place it where the user clicked
      if (position.x + formWidth > width) {
        menuRef.current.style.right = "15px";
      } else {
        menuRef.current.style.left = `${position.x - 70}px `;
      }
    }

    positionElement();
  }, [position]);

  const renderedOptions = options.map((option) => {
    const active = activeOption === option.id ? "bg-gray-100 rounded-md" : "";
    return (
      <li
        key={option.id}
        id={option.id.toString()}
        className={`${active} text-sm py-2 px-3 flex gap-4 items-center cursor-pointer truncate hover:bg-gray-100 hover:rounded-md`}
        onMouseEnter={() => setActiveOption(option.id)}
        onClick={() => handleActions(option.action)}
      >
        {option.icon}

        {option.name}
      </li>
    );
  });

  return (
    <>
      <li className="grid grid-cols-[auto,15px] p-2 border border-slate-200 rounded-md w-full text-sm  hover:bg-slate-100">
        {row.content}
        <div
          onClick={handleMenu}
          className="z-30 cursor-pointer flex items-center justify-center hover:bg-gray-200 hover:rounded-sm"
        >
          <EllipsisVertical />
        </div>
      </li>

      {isMenuOpen && (
        <ul
          ref={menuRef}
          className="absolute z-40 bg-white rounded-md border border-gray-300 p-2 "
          style={{ top: position.y }}
        >
          {renderedOptions}
        </ul>
      )}
    </>
  );
}

export default Card;
