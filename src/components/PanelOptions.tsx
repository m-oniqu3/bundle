import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  ActionEnum,
  DeleteColumnAction,
  EditColumnNameAction,
} from "../context/actions";
import { useBoardContext } from "../context/useBoardContext";
import { DeleteIcon, EditIcon } from "../icons";
import { Column } from "../types";

const lightColors = [
  "#e6e6fa", // Lavender
  "#fa8072", // Salmon
  "#add8e6", // Light Blue
  "#ffc8e4", // Hot Pink
  "#b0e0e6", // Powder Blue
  "#e0ffff", // Light Cyan
  "#98fb98", // Pale Green
  "#afeeee", // Pale Turquoise
  "#ffb6c1", // Light Pink
  "#ffe4e1", // Misty Rose
  "#dda0dd", // Plum
  "#f5f5dc", // Beige
];

const options = [
  { id: 0, icon: <DeleteIcon />, name: "Delete Column", action: "delete" },
  { id: 1, icon: <EditIcon />, name: "Edit Column", action: "edit" },
];

interface Props {
  position: { x: number; y: number };
  setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;

  closeMenu: () => void;
  column: Column;
}

function PanelOptions(props: Props) {
  const { position, setPosition, closeMenu, column } = props;
  const {
    dispatch,
    state: { activeBoard },
  } = useBoardContext();

  const menuRef = useRef<HTMLDivElement | null>(null);
  const [activeElement, setActiveElement] = useState(0);
  const [isEditingColumn, setIsEditingColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState(column.name);
  const editRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    function detectClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }

      if (editRef.current && !editRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", detectClick);

    return () => document.removeEventListener("mousedown", detectClick);
  }, [closeMenu]);

  useEffect(() => {
    function positionElement() {
      if (!menuRef.current) return;

      const width = window.innerWidth;
      const formWidth = menuRef.current.clientWidth;

      // if form is going to overflow the right side of the screen
      // place it right at the edge else place it where the user clicked
      if (position.x + formWidth > width) {
        menuRef.current.style.right = "15px";
      } else {
        menuRef.current.style.left = `${position.x}px`;
      }
    }

    positionElement();
  }, [position]);

  useEffect(() => {
    function positionElement() {
      if (!editRef.current) return;

      const width = window.innerWidth;
      const formWidth = editRef.current.clientWidth;

      // if form is going to overflow the right side of the screen
      // place it right at the edge else place it where the user clicked
      if (position.x + formWidth > width) {
        editRef.current.style.right = "15px";
      } else {
        editRef.current.style.left = `${position.x - 70}px `;
      }
    }

    positionElement();
  }, [position]);

  function handleActions(
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    action: string
  ) {
    if (action !== "delete" && action !== "edit") return;

    if (!activeBoard) {
      console.log("active board is needed to delete or edit column ");
      return;
    }

    if (action === "delete") {
      const delete_column: DeleteColumnAction = {
        type: ActionEnum.DELETE_COLUMN,
        payload: { activeBoardID: activeBoard.id, columnID: column.id },
      };

      dispatch(delete_column);

      closeMenu();
    } else {
      setIsEditingColumn((state) => !state);
      setPosition({
        x: e.pageX,
        y: e.pageY,
      });
    }
  }

  function handleEditColumnName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!activeBoard) {
      console.log("active board is needed to edit column name");
      return;
    }

    if (column.name === newColumnName) {
      closeMenu();
      return;
    }

    const edit_column_name: EditColumnNameAction = {
      type: ActionEnum.EDIT_COLUMN_NAME,
      payload: {
        activeBoardID: activeBoard.id,
        columnID: column.id,
        newColumnName,
      },
    };

    dispatch(edit_column_name);
    closeMenu();
  }

  const renderedOptions = options.map((option) => {
    const active = activeElement === option.id ? "bg-gray-100 rounded-md" : "";
    return (
      <li
        key={option.id}
        id={option.id.toString()}
        className={`${active} py-2 px-3 flex gap-4 items-center cursor-pointer truncate hover:bg-gray-100 hover:rounded-md`}
        onMouseEnter={() => setActiveElement(option.id)}
        onClick={(e) => handleActions(e, option.action)}
      >
        {option.icon}

        {option.name}
      </li>
    );
  });

  const swatches = lightColors.map((colour) => {
    return (
      <li
        key={colour}
        className="h-5 w-5  rounded-full inline-flex gap-1"
        style={{ backgroundColor: colour }}
      />
    );
  });

  return (
    <>
      {!isEditingColumn && (
        <div
          ref={menuRef}
          className="absolute
           bg-white space-y-1 z-20 border border-gray-300 rounded-lg text-sm w-60"
          style={{ top: position.y + 20 }}
        >
          <ul className="border-b-[1px] border-gray-300 p-2">
            {renderedOptions}
          </ul>

          <h1 className="pt-2 px-5 mb-2 text-xs tracking-wide  uppercase">
            Colours
          </h1>

          <ul className="pt-2 pb-4 px-5 grid grid-cols-6 gap-2">{swatches}</ul>
        </div>
      )}

      {isEditingColumn && (
        <form
          ref={editRef}
          onSubmit={handleEditColumnName}
          className="z-30 w-52 mt-4 flex gap-2 items-center absolute"
          style={{ top: position.y - 75 }}
        >
          <input
            autoFocus
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:outline-none block w-full px-3 py-2"
            placeholder="Name"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            required
          />

          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 me-2  "
          >
            Edit
          </button>
        </form>
      )}
    </>
  );
}

export default PanelOptions;
