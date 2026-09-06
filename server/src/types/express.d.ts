import { AuthPayload } from "../middleware/requireAuth";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export {};
