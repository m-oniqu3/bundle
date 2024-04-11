import { useState } from "react";
import { Actions, SetActiveBoardAction } from "../context/actions";
import { useBoardContext } from "../context/useBoardContext";
import useDetectClickOutside from "../hooks/useDetectClickOutside";
import { AddIcon, SelectIcon } from "../icons";
import { Board } from "../types";
import CreateBoard from "./CreateBoard";

function Navbar() {
  const {
    state: { activeBoard, boards },
    dispatch,
  } = useBoardContext();

  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [openDropdown, setOpenDropDown] = useState(false);
  const dropdownRef = useDetectClickOutside<HTMLUListElement>({
    closeMenu: () => setOpenDropDown(false),
  });

  function handleCreateBoard() {
    setIsCreatingBoard((state) => !state);
  }

  function handleDropdown() {
    setOpenDropDown((state) => !state);
  }

  function handleActiveBoard(board: Board) {
    const set_active_board: SetActiveBoardAction = {
      type: Actions.SET_ACTIVE_BOARD,
      payload: board,
    };

    dispatch(set_active_board);
    setOpenDropDown(false);
  }

  const createdBoards = Array.from(boards);

  const renderedBoards = createdBoards.map((board) => {
    const active =
      activeBoard?.id === board.id ? "bg-gray-100 rounded-md font-medium" : "";

    return (
      <li
        key={board.id}
        onClick={() => handleActiveBoard(board)}
        className={`${active} py-2 px-3 cursor-pointer truncate  hover:bg-gray-100 hover:rounded-md `}
      >
        {board.name}
      </li>
    );
  });

  return (
    <>
      <nav className="p-4 flex gap-4  items-center justify-between w-full ">
        <h1 className="font-bold text-xl">bundle</h1>

        {!isCreatingBoard && (
          <div className="flex gap-4 items-center">
            {activeBoard && (
              <button
                type="button"
                onClick={handleDropdown}
                className=" grid grid-cols-1 items-center gap-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 rounded-lg text-sm px-2 py-2 sm:w-28 sm:grid-cols-[auto,20px]"
              >
                <span className="hidden sm:block truncate text-left ">
                  {activeBoard.name}
                </span>
                <SelectIcon />
              </button>
            )}

            <button
              type="button"
              onClick={handleCreateBoard}
              className="flex items-center gap-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 rounded-lg text-sm px-2 py-2 sm:w-32"
            >
              <AddIcon />
              <span className="hidden sm:block">New Board</span>
            </button>
          </div>
        )}

        {isCreatingBoard && (
          <CreateBoard close={() => setIsCreatingBoard(false)} />
        )}

        {openDropdown && (
          <ul
            ref={dropdownRef}
            className="bg-white space-y-1 absolute z-20 top-16 right-4 w-32 border border-gray-300 p-2 rounded-lg text-sm sm:w-64 "
          >
            {renderedBoards}
          </ul>
        )}
      </nav>
    </>
  );
}

export default Navbar;
