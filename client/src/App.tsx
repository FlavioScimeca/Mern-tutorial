import { useEffect, useState } from 'react';
import { Note } from './model/interfaces';
import NoteComponent from './components/Note';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch('http://localhost:5000/api/notes', {
          method: 'GET',
        });

        const notes = await response.json();
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
    </div>
  );
}

export default App;
