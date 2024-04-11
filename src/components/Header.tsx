import { useState } from "react";
import { useBoardContext } from "../context/useBoardContext";
import { EllipsisIcon } from "../icons";
import BoardOption from "./BoardOption";

function Header() {
  const {
    state: { activeBoard },
  } = useBoardContext();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenu(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    setPosition({ x: e.pageX, y: e.pageY });
    setIsMenuOpen((state) => !state);
  }

  return (
    <>
      <div className="grid md:grid-cols-8 w-full items-end h-40">
        <header className="p-4 grid-cols-1 md:col-start-4 md:col-span-full md:px-0">
          <h2 className=" flex gap-6 items-center text-lg font-bold text-gray-600">
            {activeBoard?.name}

            <span className="flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:rounded-sm">
              <EllipsisIcon onClick={handleMenu} />
            </span>
          </h2>
          <p className="font-light text-sm">Create a column to get started</p>
        </header>
      </div>

      {isMenuOpen && (
        <BoardOption
          position={position}
          closeMenu={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}

export default Header;
