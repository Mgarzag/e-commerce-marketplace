import { auth } from "@/src/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Catch-all API route handler for Better Auth (/api/auth/*).
 * Automatically exposes GET and POST endpoints for authentication flows
 * such as sign-in, sign-up, sign-out, session checks, and OAuth callbacks.
 */
export const { GET, POST } = toNextJsHandler(auth);
