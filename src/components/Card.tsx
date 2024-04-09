import { Row } from "../types";

interface Props {
  row: Row;
}

function Card(props: Props) {
  const { row } = props;

  return (
    <li className="p-2 border border-slate-200 rounded-md w-full text-sm  hover:bg-slate-100">
      {row.content}
    </li>
  );
}

export default Card;
