import { memo } from 'react';
import { Note as NoteModel } from '../model/interfaces';
import { formatDate } from '../utils/formatDate';

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated: ' + formatDate(updatedAt);
  } else {
    createdUpdatedText = 'Created: ' + formatDate(createdAt);
  }
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {text}
      </p>

      <div className="flex justify-evenly flex-wrap">
        <a
          href="#"
          className=" mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
        </a>
        <a
          href="#"
          className=" mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
        </a>
      </div>
      <hr />
      <p className="text-white">{createdUpdatedText}</p>
    </div>
  );
};

export default memo(Note);
