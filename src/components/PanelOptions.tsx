import { useEffect, useRef, useState } from "react";
import { DeleteIcon, EditIcon } from "../icons";

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
  { id: 0, icon: <DeleteIcon />, name: "Delete Column" },
  { id: 1, icon: <EditIcon />, name: "Edit Column" },
];

interface Props {
  position: { x: number; y: number };
  closeMenu: () => void;
}

function PanelOptions(props: Props) {
  const { position, closeMenu } = props;
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [activeElement, setActiveElement] = useState(0);

  const swatches = lightColors.map((colour) => {
    return (
      <li
        className="h-5 w-5  rounded-full inline-flex gap-1"
        style={{ backgroundColor: colour }}
      />
    );
  });

  useEffect(() => {
    function detectClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
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
        menuRef.current.style.right = "0";
      } else {
        menuRef.current.style.left = `${position.x - 40}px`;
      }
    }

    positionElement();
  }, [position]);

  const renderedOptions = options.map((option) => {
    const active = activeElement === option.id ? "bg-gray-100 rounded-md" : "";
    return (
      <li
        id={option.id.toString()}
        className={`${active} py-2 px-3 flex gap-4 items-center cursor-pointer truncate hover:bg-gray-100 hover:rounded-md`}
        onMouseEnter={() => setActiveElement(option.id)}
      >
        {option.icon}

        {option.name}
      </li>
    );
  });

  return (
    <div
      ref={menuRef}
      className="absolute
           bg-white space-y-1 z-20 border border-gray-300 rounded-lg text-sm w-60"
      style={{ top: position.y + 20, left: position.x }}
    >
      <ul className="border-b-[1px] border-gray-300 p-2">{renderedOptions}</ul>

      <h1 className="pt-2 px-5 mb-2 text-xs tracking-wide  uppercase">
        Colours
      </h1>

      <ul className="pt-2 pb-4 px-5 grid grid-cols-6 gap-2">{swatches}</ul>
    </div>
  );
}

export default PanelOptions;
