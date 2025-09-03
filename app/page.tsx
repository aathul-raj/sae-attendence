"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./AttendanceForm.module.css";

export default function AttendancePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState("");

  const isFormValid = () => {
    return name.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError("Please provide a valid name and email address.");
      return;
    }

    setStatus("loading");
    setError(null);
    setSubmittedName(name.trim().split(" ")[0]); // Store first name for success message

    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Failed to submit. Please try again later.");
      console.error("Submission error:", err);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setStatus("idle");
    setError(null);
    setSubmittedName("");
  };
  
  // Success View
  if (status === "success") {
    return (
      <main className={styles.pageWrapper}>
        <div className={`${styles.contentWrapper} ${styles.fadeIn}`}>
          <div className={styles.successContent}>
            <span role="img" aria-label="celebration" className={styles.emoji}>
              🎉
            </span>
            <h2>Thank you, {submittedName}!</h2>
            <p>Your attendance has been recorded.</p>
            <button
              className={styles.submitAnotherButton}
              onClick={handleReset}
            >
              Submit Another
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Input Form View
  return (
    <main className={styles.pageWrapper}>
        <div className={styles.contentWrapper}>
            <div className={styles.header}>
                <h1>Attendance</h1>
                <p>Please enter your details to sign in.</p>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.inputGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    required
                    />
                </div>
    
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="jane.doe@example.com"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    required
                    />
                </div>
    
                {status === "error" && (
                    <p className={`${styles.errorMessage} ${styles.shake}`}>{error}</p>
                )}
    
                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={!isFormValid() || status === "loading"}
                >
                    {status === "loading" ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
        <p className={styles.footerText}>
            Built with passion.
        </p>
    </main>
  );
}

