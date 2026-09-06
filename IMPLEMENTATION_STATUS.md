# CollabBoard Implementation Status (Assignment 03 Audit)

Audited: `client/src/` and `server/src/` before functional changes.

## DONE

- React + TypeScript + Vite frontend with React Router page skeleton
- Node.js + Express + TypeScript backend with CORS and JSON parsing
- Mongoose installed and MongoDB connection helper (`server/src/config/database.ts`)
- Express health check (`GET /api/health`)
- In-memory project REST scaffolding:
  - `GET /api/projects`
  - `GET /api/projects/:id`
  - `POST /api/projects`
  - `PUT /api/projects/:id`
  - `DELETE /api/projects/:id`
- Frontend pages exist: Landing, Login, Register, Dashboard, All Projects, View Project, My Projects, Task Status, Project Members, Create Project, Edit Project, Profile
- `NavigationBar` uses React Router `NavLink` for core routes
- `ProjectsBoardPage` fetches projects from the API (against the in-memory store)
- `CreateProjectPage` and `EditProjectPage` call `projectService` (against the in-memory store)
- Existing team Git history and Assignment-02 tag are intact

## PARTIALLY DONE

- MongoDB: connection code exists, but no User/Task Mongoose schemas and Project is a TypeScript interface only
- Project CRUD: routes/controllers exist, but persist to `server/src/data/projects.ts` (RAM), not MongoDB
- Create/Edit Project forms: UI and some API wiring exist; members/technologies/dueDate/priority are incomplete or mocked
- Register page: client-side field checks exist; no backend call; navigates to dashboard without creating a user
- Login page: password toggle/remember-me UI exists; no credentials, no API, navigates to dashboard on click
- Environment: `server/.env` exists (`PORT`, `MONGO_URI`) but is tracked in Git; no `.env.example`; no `JWT_SECRET`; URI is logged to the console
- Frontend API client: `projectService.ts` talks to localhost without auth headers or consistent `{ success, data }` handling
- Navigation: mixed `NavLink`, `<a href="#">`, `<a href="#dashboard">`, and full-page reloads

## MISSING

- Authentication (register, login, `/api/auth/me`, JWT, `requireAuth`)
- AuthContext / ProtectedRoute
- User, Project, and Task Mongoose models with ObjectId refs and indexes
- Project membership APIs and user search
- Task APIs and persistence
- Dashboard stats API
- Profile get/update APIs
- Central Express error middleware and consistent JSON envelope
- Production-grade validation (email, password strength, ObjectIds, enums)
- Seed script
- Postman collection
- Assignment-quality README
- Screenshot capture guide (`docs/screenshots/`)
- bcrypt / jsonwebtoken dependencies
- Vite API proxy / authenticated fetch helper
- Logout that clears auth state

## NEEDS FIXING

- Hardcoded dashboard stats (5 / 24 / 8 / 6) and fake recent tasks/projects
- Hardcoded task board columns in `TaskStatusPage`
- Hardcoded view-project members (`Sathish`, `Alex`, `Sarah`, `Noah`, `John`) and technologies
- Hardcoded My Projects list
- Hardcoded Project Members table (names, roles, emails)
- Hardcoded Profile (`Jane Doe`, `jane.doe@gmail.com`)
- Hardcoded Create/Edit member options (`Sathish`, `Alex`, `Sarah`)
- Login/Register skip real authentication
- `server/.env` committed; `.gitignore` does not ignore `.env`
- `console.log("Mongo URI:", process.env.MONGO_URI)` can leak credentials
- SPA fallback may serve `index.html` for unknown API paths; API surface is incomplete
- Numeric in-memory project IDs vs future Mongo ObjectIds
- `alert()` used for Create/Edit project UX
- Landing Sign Up / Login buttons are not wired to routes
- Unauthenticated users can open `/dashboard` and other app pages
- No authorization (anyone can mutate in-memory projects; no owner/member rules)
