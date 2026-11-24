
// Creates your authentication system.
import { betterAuth } from "better-auth";
import { pool } from "@/src/lib/postgres";

// Configure Better Auth.
export const auth = betterAuth({
  // Connect Better Auth directly to Neon PostgreSQL.
  database: pool,

  // Specify the URL of your deployed website.
  baseURL: process.env.BETTER_AUTH_URL,

  // Allow authentication requests from your local and deployed websites.
  trustedOrigins: [
    "http://localhost:3000",
    "https://e-commerce-marketplace-green.vercel.app",
  ],

  // Enable email and password authentication.
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
});
