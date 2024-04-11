import { useEffect, useState } from "react";
import { Actions, DeleteBoardAction } from "../context/actions";
import { useBoardContext } from "../context/useBoardContext";
import useDetectClickOutside from "../hooks/useDetectClickOutside";
import { DeleteIcon, EditIcon } from "../icons";

const options = [
  { id: 0, icon: <DeleteIcon />, name: "Delete Board", action: "delete" },
  { id: 1, icon: <EditIcon />, name: "Edit Board", action: "edit" },
];

interface Props {
  position: { x: number; y: number };
  closeMenu: () => void;
  showEditForm: () => void;
}

function BoardOption(props: Props) {
  const { position, closeMenu, showEditForm } = props;
  const [activeElement, setActiveElement] = useState(0);
  const menuRef = useDetectClickOutside<HTMLUListElement>({ closeMenu });

  const {
    dispatch,
    state: { activeBoard },
  } = useBoardContext();

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
        menuRef.current.style.left = `${position.x + 20}px`;
      }
    }

    positionElement();
  }, [position, menuRef]);

  function handleActions(action: string) {
    if (action !== "delete" && action !== "edit") return;

    if (!activeBoard) {
      console.log("active board is needed to delete or edit column ");
      return;
    }

    if (action === "delete") {
      const delete_board: DeleteBoardAction = {
        type: Actions.DELETE_BOARD,
        payload: activeBoard.id,
      };

      dispatch(delete_board);
    } else {
      showEditForm();
    }
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
        onClick={() => handleActions(option.action)}
      >
        {option.icon}

        {option.name}
      </li>
    );
  });
  return (
    <ul
      ref={menuRef}
      className="z-30 absolute bg-white border border-gray-300 rounded-lg text-sm p-2"
      style={{ top: position.y - 30 }}
    >
      {renderedOptions}
    </ul>
  );
}

export default BoardOption;
