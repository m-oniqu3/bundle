import { useState } from "react";
import { Add, Select } from "../icons";
import CreateBoard from "./CreateBoard";

function Navbar() {
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);

  function handleCreateBoard() {
    setIsCreatingBoard((state) => !state);
  }

  console.log(isCreatingBoard);

  return (
    <>
      <nav className="p-4 flex gap-4  items-center justify-between w-full ">
        <h1 className="font-bold text-xl">bundle</h1>

        <button
          type="button"
          className="ml-auto flex items-center gap-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 rounded-lg text-sm px-2 py-2"
        >
          <span className="hidden sm:block">Your Boards</span>
          <Select />
        </button>

        <button
          type="button"
          onClick={handleCreateBoard}
          className="flex items-center gap-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 rounded-lg text-sm px-2 py-2"
        >
          <Add />
          <span className="hidden sm:block">New Board</span>
        </button>
      </nav>

      {isCreatingBoard && <CreateBoard />}
    </>
  );
}

export default Navbar;
