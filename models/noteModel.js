import mongoose, { mongo } from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    }
});

export default mongoose.model('note', noteSchema);