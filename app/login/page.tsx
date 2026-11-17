
"use client";

import { useState } from "react";
import type { ComponentProps } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/src/lib/auth-client";

export default function LoginPage() {
  // Store the customer's email and password.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Store messages displayed to the customer.
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Track whether the login request is processing.
  const [isLoading, setIsLoading] = useState(false);

  // Allows navigation after successful login.
  const router = useRouter();

  // Handle login form submission.
  const handleSubmit: NonNullable<
    ComponentProps<"form">["onSubmit"]
  > = async (event) => {
    // Prevent the browser from refreshing the page.
    event.preventDefault();

    // Clear previous messages.
    setError("");
    setSuccess("");

    // Indicate that login is processing.
    setIsLoading(true);

    try {
      // Send the customer's credentials to Better Auth.
      const { error: signInError } =
        await authClient.signIn.email({
          email,
          password,
        });

      // Display an error if authentication fails.
      if (signInError) {
        setError(
          signInError.message || "Unable to log in. Please try again."
        );
        return;
      }

      // Display a success message.
      setSuccess("You have logged in successfully!");

      // Clear the password field.
      setPassword("");

      // Redirect the customer to the homepage.
      router.push("/");
      router.refresh();
    } catch {
      // Handle unexpected errors.
      setError("Something went wrong. Please try again.");
    } finally {
      // Reset the loading state.
      setIsLoading(false);
    }
  };

  return (
    <main>
      {/* Login page heading */}
      <h1>Log In</h1>

      <p>Welcome back! Log in to your account.</p>

      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <div>
          {/* Email address field */}
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
        </div>

        <div>
          {/* Password field */}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div>

        {/* Display login errors */}
        {error && <p role="alert">{error}</p>}

        {/* Display login success */}
        {success && <p role="status">{success}</p>}

        {/* Disable the button while authentication is processing */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging In..." : "Log In"}
        </button>
      </form>

      {/* Link to registration for customers without an account */}
      <p>
        Don't have an account?{" "}
        <Link href="/register">Create an account</Link>
      </p>
    </main>
  );
}
