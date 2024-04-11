import { useEffect, useRef, useState } from "react";
import { Actions, EditRowAction } from "../context/actions";
import { useBoardContext } from "../context/useBoardContext";
import { CloseIcon, EditIcon } from "../icons";
import { Column, Row } from "../types";

interface Props {
  row: Row;
  isEditingRow: boolean;
  close: () => void;
  columnID: Column["id"];
}

function EditCard(props: Props) {
  const { row, isEditingRow, close, columnID } = props;
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [updatedContent, setUpdatedContent] = useState(row.content);

  const {
    dispatch,
    state: { activeBoard },
  } = useBoardContext();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + 3 + "px";

      // place cursor at the end of the text
      textAreaRef.current.selectionStart = textAreaRef.current.value.length;
    }
  }, [isEditingRow]);

  // resize text area on input
  function handleTextArea(e: React.FormEvent<HTMLTextAreaElement>) {
    e.currentTarget.style.height = "";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 3 + "px";
  }

  function handleEdit(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.stopPropagation();

    if (!updatedContent) return;

    if (updatedContent === row.content) return close();

    if (!activeBoard) {
      console.log("active board is required to edit this row");
      return;
    }

    const edit_row: EditRowAction = {
      type: Actions.EDIT_ROW,
      payload: {
        activeBoardID: activeBoard.id,
        columnID,
        rowID: row.id,
        newContent: updatedContent,
      },
    };

    dispatch(edit_row);
    close();
  }

  return (
    <form className="relative h-full ">
      <textarea
        ref={textAreaRef}
        value={updatedContent}
        onInput={handleTextArea}
        onChange={(e) => setUpdatedContent(e.target.value)}
        className="resize-none p-2 h-full pr-10 text-justify border border-gray-200 rounded-md w-full text-sm focus:outline-none "
        autoFocus
      />

      <div className="absolute top-2 right-2 cursor-pointer flex flex-col gap-1">
        <span
          className="flex items-center justify-center hover:bg-gray-200 hover:rounded-sm"
          onClick={close}
        >
          <CloseIcon />
        </span>
        <span
          onClick={handleEdit}
          className="px-[1px] py-[2px] flex items-center justify-center hover:bg-gray-200 hover:rounded-sm"
        >
          <EditIcon />
        </span>
      </div>
    </form>
  );
}

export default EditCard;
