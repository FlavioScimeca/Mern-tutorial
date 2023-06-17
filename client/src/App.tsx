import { useEffect, useState } from 'react';
import { Note } from './model/interfaces';
import NoteComponent from './components/Note';
import * as NotesApi from './network/notes_api';
import AddNoteDialog from './components/AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState<boolean>(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        console.log(notes);
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    loadNotes();
  }, []);

  return (
    <div className="p-4 bg-zinc-400">
      {notes.map((note) => (
        <NoteComponent key={note._id} note={note} />
      ))}
      <hr />
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setShowAddNoteDialog(true)}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>
      {showAddNoteDialog && (
        <AddNoteDialog
          isOpen={showAddNoteDialog}
          onClose={() => setShowAddNoteDialog(false)}
          onNoteSaved={() => {
            /*  */
          }}
        />
      )}
    </div>
  );
}

export default App;
