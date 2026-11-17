
"use client";

// Import useState to manage form values and component state.
import { useState } from "react";
// Import ComponentProps to obtain the correct TypeScript event type from the native HTML form element.
import type { ComponentProps } from "react";
// Import Link for navigation to the login page.
import Link from "next/link";
// Import the Better Auth client to handle customer registration.
import { authClient } from "@/src/lib/auth-client";

export default function RegisterPage() {
  // Store the values entered by the customer.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Store error and success messages displayed on the page.
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Track whether the registration request is processing.
  const [isLoading, setIsLoading] = useState(false);

  // Define the form submission handler.
  // ComponentProps<"form">["onSubmit"] gets the event type from React's built-in HTML form definitions.
  // NonNullable removes undefined from that event handler type.
  const handleSubmit: NonNullable<
    ComponentProps<"form">["onSubmit"]
    > = async (event) => {
    // Prevent the browser from refreshing the page on submission.
    event.preventDefault();

    // Clear previous messages before processing the new submission.
    setError("");
    setSuccess("");

    // Check whether the password and confirmation password match.
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check that the password contains at least 8 characters.
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    // Indicate that registration is currently processing.
    setIsLoading(true);

    try {
      // Send the customer's name, email, and password to Better Auth.
      const { error: signUpError } =
        await authClient.signUp.email({
          name,
          email,
          password,
        });

      // Display the error returned by Better Auth if registration fails.
      if (signUpError) {
        setError(signUpError.message || "Registration failed.");
        return;
      }

      // Display a success message after the account is created.
      setSuccess(
        "Your account has been created successfully!"
      );

      // Clear all registration fields after successful registration.
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch {
      // Handle unexpected errors, such as network or server failures.
      setError("Something went wrong. Please try again.");
    } finally {
      // Reset the loading state whether registration succeeds or fails.
      setIsLoading(false);
    }
  }

  return (
    <main>
      <h1>Create Your Account</h1>

      <p>Register to start shopping with us.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            // Update the name state whenever the customer types.
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            // Update the email state whenever the customer types.
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            // Update the password state whenever the customer types.
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            // Update the confirmation password state whenever the customer types.
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            placeholder="Re-enter your password"
            autoComplete="new-password"
            required
          />
        </div>
        
        {/* Show an error message when validation or registration fails. */}
        {error && <p role="alert">{error}</p>}

        {/* Show a success message when registration completes successfully. */}
        {success && <p role="status">{success}</p>}

        {/* Disable the button while the registration request is processing. */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Register"}
        </button>
      </form>

      {/* Give existing customers a way to navigate to the login page. */}
      <p>
        Already have an account?{" "}
        <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}
