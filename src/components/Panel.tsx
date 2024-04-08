import { AddIcon } from "../icons";
import { Column } from "../types";

interface Props {
  column: Column;
}

function Panel(props: Props) {
  const {
    column: { colour, name, rows },
  } = props;

  return (
    <div className="w-60 space-y-1">
      <header className="flex items-center gap-4 relative">
        <h3 className={`bg-${colour}-100 px-1 text-sm  rounded-sm`}>{name}</h3>
        <p className="text-sm">{rows.length}</p>

        <AddIcon className="absolute right-0" />
      </header>
    </div>
  );
}

export default Panel;
