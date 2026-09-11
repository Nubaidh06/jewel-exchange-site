"use client";
import { useState } from "react";

export default function ShowroomAuthGate({ onAuthenticated }) {
  const [passcode, setPasscode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passcode.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/showroom/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setErrorMessage("");
        if (typeof onAuthenticated === "function") {
          onAuthenticated();
        } else {
          window.location.reload();
        }
      } else {
        setErrorMessage(
          data.error || "Incorrect passcode. Please check with showroom administration."
        );
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Auth network error:", err);
      setErrorMessage("Network error verifying passcode. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-gate-wrapper">
      <div className="auth-gate-card">
        <div className="auth-gate-emblem">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <div className="auth-gate-titles">
          <span className="auth-gate-sub">JEWEL EXCHANGE</span>
          <h1 className="auth-gate-title">Private Showroom Access</h1>
          <p className="auth-gate-desc">
            This collection view is restricted to showroom staff and private client consultations. Enter your credentials to unlock.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-gate-form">
          <div className={`auth-gate-input-wrap ${errorMessage ? "auth-gate-input-wrap--error" : ""}`}>
            <input
              type={showPasscode ? "text" : "password"}
              autoFocus
              className="auth-gate-input"
              placeholder="Enter Showroom Passcode"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
            />
            <button
              type="button"
              className="auth-gate-toggle-pwd"
              onClick={() => setShowPasscode(!showPasscode)}
              aria-label={showPasscode ? "Hide passcode" : "Show passcode"}
            >
              {showPasscode ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {errorMessage && (
            <span className="auth-gate-error-msg">
              {errorMessage}
            </span>
          )}

          <button
            type="submit"
            className="auth-gate-submit-btn"
            disabled={isSubmitting || !passcode.trim()}
          >
            {isSubmitting ? "Unlocking..." : "Unlock Showroom Collection →"}
          </button>
        </form>

        <div className="auth-gate-footer">
          <span>514A, R.A. De Mel Mawatha, Colombo 03, Sri Lanka</span>
        </div>
      </div>
    </div>
  );
}
