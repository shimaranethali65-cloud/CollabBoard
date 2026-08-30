const API_URL = "http://localhost:5000/api/projects";

export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  members: string[];
}

// Get all projects
export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
};

// Get one project by ID
export const getProjectById = async (
  id: number | string
): Promise<Project> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  return response.json();
};

// Create a new project
export const createProject = async (
  project: Omit<Project, "id">
): Promise<Project> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  return response.json();
};

// Update a project
export const updateProject = async (
  id: number | string,
  project: Partial<Project>
): Promise<Project> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  return response.json();
};