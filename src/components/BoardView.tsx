import Columns from "./Columns";
import Header from "./Header";
import NewColumn from "./NewColumn";

function BoardView() {
  return (
    <div>
      <Header />

      <div className="p-4 grid grid-cols-8 overflow-x-scroll no-scrollbar w-full">
        <div className="flex grid-cols-1 md:col-start-4 md:col-span-full h-full w-fit ">
          <Columns />
          <NewColumn />
        </div>
      </div>
    </div>
  );
}

export default BoardView;
