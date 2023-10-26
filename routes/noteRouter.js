import express from 'express';
import { createNote, getAllNotes, getSingle, removeNote, updateNote } from '../controller/noteController.js';

const noteRouter = express.Router();

noteRouter.get("/get-all", getAllNotes);
noteRouter.get("/get-one/:id", getSingle);
noteRouter.post("/create", createNote);
noteRouter.delete("/delete/:id", removeNote);
noteRouter.put("/update/:id", updateNote);

export default noteRouter;