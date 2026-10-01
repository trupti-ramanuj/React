import { useState } from "react";
import { useUsers } from "./hook/useUsers";

function Login() {
  const { login, loginLoading, loginError } = useUsers();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      await login(
        form.username.trim(),
        form.password.trim()
      );
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            User Manager
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8"
        >
     
          {loginError && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <p className="font-semibold">Login failed</p>
              <p className="mt-1">{loginError}</p>
            </div>
          )}

   
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Username
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              autoComplete="username"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                errors.username
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              }`}
            />

            {errors.username && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.username}
              </p>
            )}
          </div>

  
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              autoComplete="current-password"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                errors.password
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              }`}
            />

            {errors.password && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.password}
              </p>
            )}
          </div>

         
          <button
            type="submit"
            disabled={loginLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loginLoading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}

            {loginLoading ? "Signing in..." : "Sign In"}
          </button>

     
          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
              Demo Credentials
            </p>

            <div className="space-y-1 text-sm text-slate-600">
              <p>
                Username:{" "}
                <strong className="text-slate-900">
                  emilys
                </strong>
              </p>

              <p>
                Password:{" "}
                <strong className="text-slate-900">
                  emilyspass
                </strong>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;