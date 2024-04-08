import { useState } from "react";
import { useBoardContext } from "../context/useBoardContext";
import { AddIcon, SelectIcon } from "../icons";
import CreateBoard from "./CreateBoard";

function Navbar() {
  const {
    state: { activeBoard },
  } = useBoardContext();
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);

  function handleCreateBoard() {
    setIsCreatingBoard((state) => !state);
  }

  return (
    <>
      <nav className="p-4 flex gap-4  items-center justify-between w-full ">
        <h1 className="font-bold text-xl">bundle</h1>

        {!isCreatingBoard && (
          <div className="flex gap-4 items-center">
            <button
              type="button"
              className="flex items-center gap-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 rounded-lg text-sm px-2 py-2"
            >
              <span className="hidden sm:block">
                {activeBoard || "Your Boards"}
              </span>
              <SelectIcon />
            </button>

            <button
              type="button"
              onClick={handleCreateBoard}
              className="flex items-center gap-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 rounded-lg text-sm px-2 py-2"
            >
              <AddIcon />
              <span className="hidden sm:block">New Board</span>
            </button>
          </div>
        )}

        {isCreatingBoard && (
          <CreateBoard close={() => setIsCreatingBoard(false)} />
        )}
      </nav>
    </>
  );
}

export default Navbar;
