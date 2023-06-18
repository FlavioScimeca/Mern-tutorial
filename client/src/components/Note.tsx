import { memo } from 'react';
import { Note as NoteModel } from '../model/interfaces';
import { formatDate } from '../utils/formatDate';
import { BiTrash, BiEdit } from 'react-icons/bi';

interface NoteProps {
  note: NoteModel;
  onDeleteClickedNote: (noteId: string) => void;
  onNoteClicked: (note: NoteModel) => void;
}

const Note = ({ note, onDeleteClickedNote, onNoteClicked }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated: ' + formatDate(updatedAt);
  } else {
    createdUpdatedText = 'Created: ' + formatDate(createdAt);
  }
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {text}
      </p>

      <div className="flex justify-evenly flex-wrap mb-2 mt-auto w-full">
        <button
          onClick={(ev) => {
            onDeleteClickedNote(note._id);
            ev.stopPropagation();
          }}
          className=" mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-rose-300"
        >
          Delete
          <BiTrash className="h-6 w-6 bg-red-600 ml-2 p-1 rounded-full" />
        </button>
        <button
          onClick={() => onNoteClicked(note)}
          className=" mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Edit
          <BiEdit className="h-6 w-6 bg-blue-600 ml-2 p-1 rounded-full" />
        </button>
      </div>
      <hr />
      <p className="text-white">{createdUpdatedText}</p>
    </div>
  );
};

export default memo(Note);
