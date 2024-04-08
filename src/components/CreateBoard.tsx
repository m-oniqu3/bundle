import { CloseIcon } from "../icons";

interface Props {
  close: () => void;
}

function CreateBoard(props: Props) {
  const { close } = props;
  return (
    <form className="w-full max-w-72 flex items-center gap-2">
      <input
        placeholder="New Board"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full px-3 py-2"
      />

      <button
        type="submit"
        className=" text-white border border-gray-300 focus:outline-none rounded-lg text-sm px-3 py-2 bg-gray-800"
      >
        Create
      </button>
      <button
        type="button"
        onClick={close}
        className="flex items-center gap-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 rounded-lg text-sm px-2 py-2"
      >
        <CloseIcon />
      </button>
    </form>
  );
}

export default CreateBoard;
