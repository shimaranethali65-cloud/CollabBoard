const API_URL = "http://localhost:5000/api/projects";

export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  members: string[];
}

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
};