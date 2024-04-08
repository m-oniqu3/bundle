function CreateBoard() {
  return (
    <form className="center md:right-4 w-full max-w-64 flex items-center gap-2">
      <input
        placeholder="New Board"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full px-3 py-2"
      />

      <button
        type="button"
        className=" text-white border border-gray-300 focus:outline-none rounded-lg text-sm px-3 py-2 bg-gray-800"
      >
        Create
      </button>
    </form>
  );
}

export default CreateBoard;
