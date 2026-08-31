
import { Request, Response } from 'express';
import Project from '../models/project';

export const getProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

export const getUserProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const projects = await Project.find({ members: userId });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};
