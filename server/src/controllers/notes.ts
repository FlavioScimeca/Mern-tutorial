import { NextFunction, Request, RequestHandler, Response } from 'express';
import NoteModel from '../models/note';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

//! here is all the logic of the endpoint like in Laravel

export const getNotes: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // throw createHttpError(401);
    const notes = await NoteModel.find().exec();

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { noteId } = req.params;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError('404', 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;
  console.log(title, text);
  try {
    if (!title) {
      throw createHttpError(400, 'Note must have a title');
    }

    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

//! UPDATE

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}
export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const { noteId } = req.params;
  const { title, text } = req.body;

  console.log(title, text);
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }

    if (!title) {
      throw createHttpError(400, 'Note must have a title');
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError('404', 'Note not found');
    }

    let newNote = await note.updateOne({
      title: title,
      text: text,
    });
    newNote = await note.save();

    res.status(200).json(newNote);
  } catch (error) {
    next(error);
  }
};

//! DELETE

export const deleteNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }
    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(400, 'Note not found');
    }

    await note.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
