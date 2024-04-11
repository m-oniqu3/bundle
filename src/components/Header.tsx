import { useEffect, useState } from "react";
import { Actions, EditBoardAction } from "../context/actions";
import { useBoardContext } from "../context/useBoardContext";
import { CloseIcon, EllipsisIcon } from "../icons";
import BoardOption from "./BoardOption";

function Header() {
  const {
    dispatch,
    state: { activeBoard },
  } = useBoardContext();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState(activeBoard?.name ?? "");

  function handleMenu(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    setPosition({ x: e.pageX, y: e.pageY });
    setIsMenuOpen((state) => !state);
  }

  useEffect(() => {
    if (activeBoard) {
      setNewBoardName(activeBoard.name);
    }
  }, [activeBoard]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newBoardName) return;

    if (!activeBoard) {
      console.log("active board is needed to edit board name");
      return;
    }

    if (newBoardName.trim() === activeBoard.name) return;

    const edit_board: EditBoardAction = {
      type: Actions.EDIT_BOARD_NAME,
      payload: {
        activeBoardID: activeBoard.id,
        newBoardName: newBoardName.trim(),
      },
    };

    dispatch(edit_board);
    setIsEditingBoard(false);
  }

  return (
    <>
      <div className="grid md:grid-cols-8 w-full items-end h-40">
        <header className="p-4 grid-cols-1 md:col-start-4 md:col-span-full md:px-0">
          {isEditingBoard && (
            <form className="flex gap-4 items-center" onSubmit={handleSubmit}>
              <input
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                autoFocus
                className="text-lg font-bold text-gray-600 focus:outline-none"
              />

              <span
                className="cursor-pointer flex items-center justify-center hover:bg-gray-200 hover:rounded-sm p-1"
                onClick={() => setIsEditingBoard(false)}
              >
                <CloseIcon />
              </span>
            </form>
          )}

          {!isEditingBoard && (
            <h2 className=" flex gap-6 items-center text-lg font-bold text-gray-600">
              {activeBoard?.name}

              <span className="flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:rounded-sm">
                <EllipsisIcon onClick={handleMenu} />
              </span>
            </h2>
          )}
          <p className="font-light text-sm">Create a column to get started</p>
        </header>
      </div>

      {isMenuOpen && (
        <BoardOption
          position={position}
          closeMenu={() => setIsMenuOpen(false)}
          showEditForm={() => setIsEditingBoard((state) => !state)}
        />
      )}
    </>
  );
}

export default Header;
