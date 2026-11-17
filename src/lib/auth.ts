
// Creates your authentication system.
import { betterAuth } from "better-auth";

// Manages PostgreSQL database connections.
import { Pool } from "pg";

// Create a PostgreSQL connection pool for Better Auth.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Configure Better Auth.
export const auth = betterAuth({
  // Connect Better Auth directly to Neon PostgreSQL.
  database: pool,

  // Specify the URL of your deployed website.
  baseURL: process.env.BETTER_AUTH_URL,

  // Allow authentication requests from your local and deployed websites.
  trustedOrigins: [
    "http://localhost:3000",
    process.env.BETTER_AUTH_URL!,
  ],

  // Enable email and password authentication.
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
});
