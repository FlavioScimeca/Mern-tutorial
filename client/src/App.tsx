import { useEffect, useState } from 'react';
import { Note } from './model/interfaces';
import NoteComponent from './components/Note';
import * as NotesApi from './network/notes_api';
import AddEditNoteModal from './components/AddEditNoteModal';
import SpinnerLoader from './components/SpinnerLoader';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState<boolean>(false);
  const [showNotesLoadingError, setShowNotesLoadingError] =
    useState<boolean>(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState<boolean>(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  const onDeleteNote = async (noteId: string) => {
    try {
      setNotesLoading(true);
      await NotesApi.deleteNote(noteId);
      setNotes(notes.filter((existingNotes) => existingNotes._id !== noteId));
    } catch (error) {
      console.log(error);
      setShowNotesLoadingError(true);
    } finally {
      setNotesLoading(false);
    }
  };

  useEffect(() => {
    async function loadNotes() {
      try {
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }

    loadNotes();
  }, []);

  return (
    <>
      {notesLoading && <SpinnerLoader />}
      {showNotesLoadingError && (
        <div className=" flex h-screen items-center justify-center">
          <p className=" text-center text-2xl font-semibold">
            Something go wrong <br /> Reload the page
          </p>
        </div>
      )}

      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? (
            <div className="mt-3 p-4 mx-auto bg-zinc-400 max-w-4xl grid grid-cols-3 gap-3">
              {notes.map((note) => (
                <NoteComponent
                  key={note._id}
                  note={note}
                  onDeleteClickedNote={onDeleteNote}
                  onNoteClicked={setNoteToEdit}
                />
              ))}
            </div>
          ) : (
            <div className=" flex h-[50vh] items-center justify-center">
              <p className=" text-center text-2xl font-semibold">
                Not Note to fetch
              </p>
            </div>
          )}
        </>
      )}

      <div className="flex items-center justify-center mt-3">
        <button
          type="button"
          onClick={() => setShowAddNoteDialog(true)}
          className="rounded-md bg-green-800 bg-opacity-70 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Create a new one
        </button>
      </div>

      {showAddNoteDialog && (
        <AddEditNoteModal
          isOpen={showAddNoteDialog}
          onClose={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteModal
          noteToEdit={noteToEdit}
          onClose={() => setNoteToEdit(null)}
          isOpen={true}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
}

export default App;
