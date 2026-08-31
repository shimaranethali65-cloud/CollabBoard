import { Request, Response } from "express";
import Task from "../models/Task";

export const getProjectTasks = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    // Find all tasks that match this project ID
    const tasks = await Task.find({ project: projectId });
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};