import express from "express";
import Task from "../models/Task.js";

const router=express.Router();

router.get("/",async(req,res)=>{
    try{
        const tasks=await Task.find();
        res.json(tasks);
    }catch(error){
        res.status(500).json({error:error.message});
    }
})

router.get("/:id",async(req,res)=>{
    try{
        const task=await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({error:"Task not found"});
        }

        res.json(task);
    }catch(error){
        res.status(400).json({error:error.message});
    }
});

router.post("/",async(req,res)=>{
    try{
        const task=await Task.create({
            title:req.body.title,
            completed:req.body.completed
        });
        res.status(201).json(task)
    }catch(error){
        res.status(400).json({error:error.message});
    }
});

router.put("/:id",async (req,res)=>{
    try{
        const task=await Task.findByIdAndUpdate(
            req.params.id,
            {
                title:req.body.title,
                completed:req.body.completed
            },
            {new:true,runValidators:true}
        );

        if(!task){
            return res.status(404).json({error:"Task not found"});
        }

        res.json(task)
    }catch(error){
        res.status(400).json({error:error.message});
    }
});

router.delete("/:id",async(req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id);

        if(!task){
            return res.status(404).json({error:"Task not found"})
        }

        res.json({message:"Task deleted"})
    }catch(error){
        res.status(400).json({error:error.message});
    }
})

export default router;