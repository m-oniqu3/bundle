import { useState } from "react";
import { AddIcon, EllipsisIcon } from "../icons";
import { Column } from "../types";
import PanelOptions from "./PanelOptions";

interface Props {
  column: Column;
}

function Panel(props: Props) {
  const {
    column: { name, rows },
  } = props;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsOpenMenu] = useState(false);

  function handlePosition(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    setPosition({ x: e.pageX, y: e.pageY });
    setIsOpenMenu((state) => !state);
  }

  return (
    <>
      <div className="w-72 space-y-1">
        <header className="flex items-center gap-4 relative">
          <h3 className="bg-indigo-200 px-1 text-sm  rounded-sm">{name}</h3>
          <p className="text-sm">{rows.length}</p>

          <div className="absolute right-0 flex items-center gap-1 cursor-pointer">
            <EllipsisIcon onClick={handlePosition} />

            <AddIcon />
          </div>
        </header>
      </div>

      {isMenuOpen && (
        <PanelOptions
          position={position}
          closeMenu={() => setIsOpenMenu(false)}
        />
      )}
    </>
  );
}

export default Panel;
