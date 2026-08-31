export interface Project {
  id: string;
  name: string;
  members: string[];
  _id?: string;
  title?: string;
  description: string;
  status?: string;
  createdAt?: string;
}

export interface UserProfile {
  _id?: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
}

const API_URL = 'http://localhost:5000/api';

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
};

const normalizeProject = (project: Omit<Project, 'id'> & { _id?: string; id?: string }): Project => ({
  ...project,
  id: project.id || project._id || '',
  members: project.members || [],
});

export const getUserProfile = async (): Promise<UserProfile> => {
  return fetchJson<UserProfile>(`${API_URL}/users/profile`);
};

export const getProjects = async (): Promise<Project[]> => {
  const projects = await fetchJson<Array<Omit<Project, 'id'> & { _id?: string; id?: string }>>(`${API_URL}/projects`);
  return projects.map(normalizeProject);
};
