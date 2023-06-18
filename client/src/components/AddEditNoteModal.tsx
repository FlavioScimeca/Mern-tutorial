import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { NoteInput } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import { Note } from '../model/interfaces';

interface AddNoteDialogProps {
  noteToEdit?: Note;
  isOpen?: boolean;
  onClose: () => void;
  onNoteSaved: (note: Note) => void;
}

const AddEditNoteDialog = ({
  noteToEdit,
  isOpen,
  onClose,
  onNoteSaved,
}: AddNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || '',
      text: noteToEdit?.text || '',
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }

      onNoteSaved(noteResponse);
    } catch (error) {
      console.log(error);
    }
  }

  const onCloseDialog = () => {
    if (!errors) {
      onClose();
    } else {
      return;
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <form
          id="AddEditNote"
          className="fixed inset-0 overflow-y-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create a new note
                </Dialog.Title>
                <div className="mt-2">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    placeholder="Title?"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="small-input"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('title', { required: 'Title is required' })}
                  />
                  {errors.title?.message && (
                    <p className="mt-2 text-sm text-red-600 p-2 rounded-md border-[1px] border-red-600">
                      <span className="font-medium mr-2">Alert</span>
                      {errors.title?.message}
                    </p>
                  )}
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Body text
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                    {...register('text')}
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    form="AddEditNote"
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onCloseDialog}
                  >
                    {isSubmitting
                      ? 'Loading..'
                      : noteToEdit
                      ? 'Edit'
                      : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onClose()}
                    className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition>
  );
};

export default AddEditNoteDialog;
