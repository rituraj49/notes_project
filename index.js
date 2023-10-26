import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRouter from './routes/authRouter.js'
import noteRouter from './routes/noteRouter.js';
import cors from 'cors';

// dotenv configuration 
dotenv.config();

const PORT = process.env.PORT;

connectDb();

// express implementation
const app = express();

// middlewares
app.use(express.json());

// cors config
app.use(cors());

// auth routes  
app.use("/api/auth/", authRouter);

// notes routes
app.use("/notes/", noteRouter);

app.get("/", (req, res)=>{
    res.send("server running...");
}).listen(PORT, ()=> console.log(`server active at ${PORT}`));