import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import taskRoutes from "./routes/taskRoutes.js"

dotenv.config();

const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.json({message:"Tak Manager API is running"})
})

app.use('/tasks', taskRoutes)

const PORT=process.env.PORT || 3000;

async function startServer(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")

        app.listen(PORT,"0.0.0.0",()=>{
            console.log(`Server running on port ${PORT}`);
        });
    }catch(error){
        console.error("Startup failed:", error.message);
        process.exit(1);
    }
}

startServer()