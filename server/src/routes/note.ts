import * as NoteController from '../controllers/notes';
import express from 'express';

//! in this file we handle all the URL and methods and the logic is stored in a controller like in Laravel

const router = express.Router();

router.get('/', NoteController.getNotes);
router.get('/:noteId', NoteController.getNote);
router.post('/add', NoteController.createNote);
router.patch('/update/:noteId', NoteController.updateNote);
router.delete('/delete/:noteId', NoteController.deleteNote);

export default router;
