function Header() {
  return (
    <div className="grid md:grid-cols-8 w-full  items-end h-32">
      <header className="p-4 grid-cols-1 md:col-start-4 md:col-span-full ">
        <h2 className="text-lg font-bold">Kanban Board</h2>
        <p className="font-light text-sm">Create a column to get started</p>
      </header>
    </div>
  );
}

export default Header;
