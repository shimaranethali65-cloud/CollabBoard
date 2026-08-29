import { Project } from "../models/project";

export let projects: Project[] = [
  {
    id: 1,
    name: "Website Development",
    description: "Developing the CollabBoard web application",
    status: "In Progress",
    members: ["Shimara", "Member 2", "Member 3"]
  },
  {
    id: 2,
    name: "Mobile Application",
    description: "Designing a mobile application",
    status: "Planning",
    members: ["Shimara", "Member 4"]
  }
];