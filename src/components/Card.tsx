import { Fragment } from "react/jsx-runtime";
import { Row } from "../types";

interface Props {
  rows: Row[];
}

function Card(props: Props) {
  const { rows } = props;

  const renderedRows = rows.map((row) => {
    return <li className="w-full bg-yellow-500">{row.content}</li>;
  });

  return <Fragment>{renderedRows}</Fragment>;
}

export default Card;
