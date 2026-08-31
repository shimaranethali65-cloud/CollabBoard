const API_URL = "http://localhost:5000/api/projects";
export type ProjectMember = { name: string; email: string; role: string };
export type Project = { id: string; name: string; description: string; status: string; members: ProjectMember[] };
const normalize = (project: any): Project => ({ ...project, id: String(project.id), members: (project.members ?? []).map((member: ProjectMember | string) => typeof member === "string" ? { name: member, email: "", role: "Member" } : member) });
export const getProjects = async (): Promise<Project[]> => { const response = await fetch(API_URL); if (!response.ok) throw new Error("Unable to load projects"); return (await response.json()).map(normalize); };
export const getProjectById = async (id: string): Promise<Project> => { const response = await fetch(`${API_URL}/${id}`); if (!response.ok) throw new Error("Unable to load project"); return normalize(await response.json()); };
export const updateProject = async (id: string, update: Partial<Project>): Promise<Project> => { const response = await fetch(`${API_URL}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(update) }); if (!response.ok) throw new Error("Unable to update project"); return normalize(await response.json()); };
