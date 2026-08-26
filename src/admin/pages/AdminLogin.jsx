import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowUpRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import "../styles/AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [rememberMe, setRememberMe] = useState(true);

  // =====================================================
  // CHECK EXISTING LOGIN
  // =====================================================

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError("");

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://dental-website-backend.onrender.com/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Invalid email or password"
        );
      }

      // =================================================
      // SAVE ADMIN SESSION
      // =================================================

      if (rememberMe) {
        localStorage.setItem(
          "adminToken",
          data.token
        );

        localStorage.setItem(
          "adminData",
          JSON.stringify(data.admin)
        );
      } else {
        sessionStorage.setItem(
          "adminToken",
          data.token
        );

        sessionStorage.setItem(
          "adminData",
          JSON.stringify(data.admin)
        );
      }

      // =================================================
      // REDIRECT TO DASHBOARD
      // =================================================

      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        error.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FORGOT PASSWORD
  // =====================================================

  const handleForgotPassword = () => {
    setError(
      "Password reset is not available yet. Please contact the clinic administrator."
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="admin-login">

      {/* =====================================================
          LEFT PANEL
      ===================================================== */}

      <section className="admin-login-brand">

        <div className="admin-login-brand-overlay" />

        <div className="admin-login-brand-content">

          <a
            href="/"
            className="admin-login-logo"
          >
            <span className="admin-login-logo-mark">
              O
            </span>

            <span>
              <strong>Oak & Ivory</strong>
              <small>DENTAL</small>
            </span>
          </a>

          <div className="admin-login-brand-copy">

            <span className="admin-login-eyebrow">
              CLINICOS ADMIN
            </span>

            <h1>
              Care,
              <br />
              <em>managed beautifully.</em>
            </h1>

            <p>
              Manage appointments, patients, doctors,
              leads and Ivy conversations from one
              central workspace.
            </p>

          </div>

          <div className="admin-login-brand-footer">

            <div>
              <ShieldCheck size={15} />

              <span>
                Secure clinic workspace
              </span>
            </div>

            <span>
              © 2026 Oak & Ivory
            </span>

          </div>

        </div>

      </section>

      {/* =====================================================
          RIGHT PANEL
      ===================================================== */}

      <section className="admin-login-form-panel">

        <div className="admin-login-form-wrapper">

          <div className="admin-login-mobile-logo">

            <span className="admin-login-logo-mark">
              O
            </span>

            <span>
              <strong>Oak & Ivory</strong>
              <small>DENTAL</small>
            </span>

          </div>

          <div className="admin-login-heading">

            <span className="admin-login-small-label">
              ADMIN PORTAL
            </span>

            <h2>
              Welcome
              <br />
              <em>back.</em>
            </h2>

            <p>
              Sign in to continue to your clinic
              dashboard.
            </p>

          </div>

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (
            <div
              className="admin-login-error"
              role="alert"
            >
              {error}
            </div>
          )}

          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
          >

            {/* Email */}

            <div className="admin-login-field">

              <label htmlFor="admin-email">
                Email address
              </label>

              <div className="admin-login-input">

                <Mail size={16} />

                <input
                  id="admin-email"
                  type="email"
                  name="email"
                  placeholder="admin@oakivorydental.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={loading}
                  required
                />

              </div>

            </div>

            {/* Password */}

            <div className="admin-login-field">

              <div className="admin-login-password-label">

                <label htmlFor="admin-password">
                  Password
                </label>

                <button
                  type="button"
                  className="admin-login-forgot"
                  onClick={handleForgotPassword}
                  disabled={loading}
                >
                  Forgot password?
                </button>

              </div>

              <div className="admin-login-input">

                <LockKeyhole size={16} />

                <input
                  id="admin-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  className="admin-login-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

              </div>

            </div>

            {/* Remember */}

            <label className="admin-login-remember">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) =>
                  setRememberMe(
                    event.target.checked
                  )
                }
                disabled={loading}
              />

              <span>
                Keep me signed in
              </span>

            </label>

            {/* Submit */}

            <button
              type="submit"
              className="admin-login-submit"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Signing in..."
                  : "Sign in to dashboard"}
              </span>

              {!loading && (
                <span className="admin-login-submit-icon">
                  <ArrowUpRight size={16} />
                </span>
              )}

            </button>

          </form>

          {/* Bottom info */}

          <div className="admin-login-bottom">

            <div className="admin-login-security">

              <ShieldCheck size={14} />

              <span>
                Your clinic data is protected
              </span>

            </div>

            <a href="/">
              Back to website
            </a>

          </div>

        </div>

      </section>

    </main>
  );
};

export default AdminLogin;