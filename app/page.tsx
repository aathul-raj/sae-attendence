"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./page.module.css";

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
    setSubmittedName(name.trim().split(" ")[0]);

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
  
  if (status === "success") {
    return (
      <main className={styles.pageWrapper}>
        <div className={`${styles.successContainer} ${styles.fadeIn}`}>
          <div className={styles.successIcon}>
            <svg viewBox="0 0 24 24" fill="none" className={styles.checkmark}>
              <path 
                d="M20 6L9 17L4 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className={styles.successTitle}>Welcome, {submittedName}</h2>
          <p className={styles.successText}>Your attendance has been recorded</p>
          <button
            className={styles.newEntryButton}
            onClick={handleReset}
          >
            New Entry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>SAE Attendance</h1>
            <p className={styles.subtitle}>Please enter your details.</p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            {status === "error" && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isFormValid() || status === "loading"}
            >
              {status === "loading" ? (
                <span className={styles.loadingState}>
                  <span className={styles.spinner}></span>
                  Processing
                </span>
              ) : (
                "Continue"
              )}
            </button>
          </form>
        </div>
        
        <p className={styles.footer}>
          TAMU Formula Electric Software
        </p>
      </div>
    </main>
  );
}