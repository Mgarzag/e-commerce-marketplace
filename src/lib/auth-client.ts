import { createAuthClient } from "better-auth/react";

// Automatically uses the current website's origin.
// Works on localhost and the deployed Vercel domain.
export const authClient = createAuthClient();
