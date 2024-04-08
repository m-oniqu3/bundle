import { useBoardContext } from "../context/useBoardContext";

function Header() {
  const {
    state: { activeBoard },
  } = useBoardContext();

  return (
    <div className="grid md:grid-cols-8 w-full items-end h-40">
      <header className="p-4 grid-cols-1 md:col-start-4 md:col-span-full md:px-2">
        <h2 className="text-lg font-bold text-gray-600">{activeBoard}</h2>
        <p className="font-light text-sm">Create a column to get started</p>
      </header>
    </div>
  );
}

export default Header;
