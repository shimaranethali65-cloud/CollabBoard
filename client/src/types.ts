export type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  role?: "ADMIN" | "USER" | string;
  profileImage?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Project = {
  _id: string;
  id?: string;
  name: string;
  description: string;
  dueDate?: string;
  status:
    | "TODO"
    | "DOING"
    | "IN_PROGRESS"
    | "SUBMITTED"
    | "DONE"
    | "COMPLETED"
    | "CLOSED"
    | "PLANNING";
  priority: "LOW" | "MEDIUM" | "HIGH";
  requiredMembers: number;
  isClosed?: boolean;
  submittedAt?: string;
  approvedAt?: string;
  leaderId?: string | null;
  leader?: User | null;
  owner: User;
  members: User[];
  technologies: string[];
  progress?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
  assignedTo?: User | null;
  createdBy?: User;
  project: { _id: string; name: string } | string;
  createdAt?: string;
  updatedAt?: string;
};

export type Member = User & { role: "LEADER" | "OWNER" | "MEMBER"; isLeader?: boolean };

export type DashboardStats = {
  totalProjects: number;
  totalTasks: number;
  todoTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  overdueTasks: number;
  recentProjects: Project[];
  recentTasks: Task[];
};

export type AdminOverview = {
  stats: {
    totalProjects: number;
    todoProjects: number;
    doingProjects: number;
    submittedProjects: number;
    doneProjects: number;
    closedProjects: number;
  };
  pendingApprovals: Project[];
  allProjects: Project[];
};

export const statusLabel = (status: string) => {
  const map: Record<string, string> = {
    TODO: "To Do (Filling)",
    DOING: "Doing (In Progress)",
    IN_PROGRESS: "Doing (In Progress)",
    SUBMITTED: "Submitted for Approval",
    DONE: "Done (Approved)",
    COMPLETED: "Done (Approved)",
    CLOSED: "Closed",
    PLANNING: "To Do (Filling)"
  };
  return map[status] || status;
};

export const formatDate = (value?: string) => {
  if (!value) {
    return "No due date";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "No due date";
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

export const daysLeft = (value?: string) => {
  if (!value) {
    return "No due date";
  }
  const due = new Date(value);
  const diff = Math.ceil((due.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff < 0) {
    return `${Math.abs(diff)} days overdue`;
  }
  if (diff === 0) {
    return "Due today";
  }
  return `${diff} Days Left`;
};
