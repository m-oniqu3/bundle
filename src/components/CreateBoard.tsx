import { useState } from "react";
import { Actions, CreateBoardAction } from "../context/actions";
import { useBoardContext } from "../context/useBoardContext";
import useDetectClickOutside from "../hooks/useDetectClickOutside";
import { CloseIcon } from "../icons";

interface Props {
  close: () => void;
}

function CreateBoard(props: Props) {
  const { close } = props;
  const formRef = useDetectClickOutside<HTMLFormElement>({ closeMenu: close });

  const {
    state: { boards },
    dispatch,
  } = useBoardContext();
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name) return;

    if (boards.find((board) => board.name === name)) {
      console.log("board exists");
      return;
    }

    const create_board: CreateBoardAction = {
      type: Actions.CREATE_BOARD,
      payload: name,
    };

    dispatch(create_board);

    close();
  }

  return (
    <form
      ref={formRef}
      className="w-full max-w-72 flex items-center gap-2"
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        placeholder="New Board"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:outline-none block w-full px-3 py-2"
      />

      <button
        type="submit"
        className=" text-white border border-gray-300 focus:outline-none 
        rounded-lg text-sm px-3 py-2 bg-gray-800"
      >
        Create
      </button>

      <button
        type="button"
        onClick={close}
        className="flex items-center gap-2 text-gray-900 bg-white border border-gray-300 
        focus:outline-none hover:bg-gray-100 rounded-lg text-sm px-2 py-2"
      >
        <CloseIcon />
      </button>
    </form>
  );
}

export default CreateBoard;
