import mongoose from "mongoose";
import noteModel from "../models/noteModel.js";

export const createNote = async(req, res) => {
    try {
        const { title, description, userId } = req.body;
        if (!title)
            return res.send({ error: "title is required" });
        else if (!description)
            return res.send({ error: "description is required" });

        const newNote = new noteModel({
            title, description, 
            user: userId
        });
        await newNote.save();

        return res.status(201).send({
            success: true,
            message: "new note created successfully",
            newNote
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "failed to create new note",
            error
        });
    }
}

export const getAllNotes = async(req, res) => {
    try {
        const result = await noteModel.find();
            return res.status(200).send({
                success: true,
                message: "all notes fetched successfully",
                result
            });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "failed to fetch notes",
            error
        })
    }
}

export const getSingle = async(req, res) => {
    try {
        // const {title} = req.params;
        const result = await noteModel.findById({_id: req.params.id});
            return res.status(200).send({
                success: true,
                message: "note fetched successfully",
                result
            });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "failed to fetch notes",
            error
        });
    }
}

export const removeNote = async(req, res) => {
    try {
        // const {id} = req.params.id;
        const deleted = await noteModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: "note deleted successfully",
            deleted
        })        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "failed to delete note",
            error
        });
    }
}

export const updateNote = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedNote = await noteModel.findByIdAndUpdate(id, {title, description});
        return res.status(200).send({
            success: true,
            message: "note updated succcessfully",
            updatedNote
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error while trying to update note",
            error
        })
    }
}