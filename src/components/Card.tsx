import { useEffect, useRef, useState } from "react";
import { Actions, DeleteRowAction } from "../context/actions";
import { useBoardContext } from "../context/useBoardContext";
import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  EllipsisVertical,
} from "../icons";
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
  const {
    dispatch,
    state: { activeBoard },
  } = useBoardContext();

  const [isMenuOpen, setOpenMenu] = useState(false);
  const [isEditingRow, setIsEditingRow] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeOption, setActiveOption] = useState(0);
  const [updatedContent, setUpdatedContent] = useState(row.content);

  const menuRef = useRef<HTMLUListElement | null>(null);
  const rowRef = useRef<HTMLLIElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

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
    } else if (action === "edit") {
      setIsEditingRow((state) => !state);
      setOpenMenu(false);
    }
  }

  function handleTextArea(e: React.FormEvent<HTMLTextAreaElement>) {
    e.currentTarget.style.height = "";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 3 + "px";
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

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + 3 + "px";

      textAreaRef.current.selectionStart = textAreaRef.current.value.length;
    }
  }, [isEditingRow]);

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
      {!isEditingRow ? (
        <li
          ref={rowRef}
          className="grid grid-cols-[auto,15px] items-start p-2 border border-slate-200 rounded-md w-full text-sm hover:bg-slate-100 "
        >
          {row.content}
          <div
            onClick={handleMenu}
            className="z-30 cursor-pointer flex items-center justify-center hover:bg-gray-200 hover:rounded-sm"
          >
            <EllipsisVertical />
          </div>
        </li>
      ) : (
        <form className="relative h-full ">
          <textarea
            ref={textAreaRef}
            value={updatedContent}
            onInput={handleTextArea}
            onChange={(e) => setUpdatedContent(e.target.value)}
            className="p-2 h-full pr-10 text-justify border border-gray-200 rounded-md w-full text-sm focus:outline-none "
            autoFocus
          />

          <div
            className="absolute top-2 right-2 cursor-pointer flex flex-col gap-2"
            onClick={() => setIsEditingRow(false)}
          >
            <CloseIcon />
            <CheckIcon />
          </div>
        </form>
      )}

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
