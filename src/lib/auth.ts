
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

  // Enable email and password authentication.
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
});
