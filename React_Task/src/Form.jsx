import { useEffect, useState } from "react";

const emptyForm = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  age: "",
};

function Form({
  edit,
  onSubmit,
  onCancel,
  loading,
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (edit) {
      setForm({
        firstName: edit.firstName || "",
        lastName: edit.lastName || "",
        username: edit.username || "",
        email: edit.email || "",
        phone: edit.phone || "",
        age: edit.age || "",
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
  }, [edit]);

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

  function validate() {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName =
        "First name is required.";
    } else if (form.firstName.trim().length < 2) {
      newErrors.firstName =
        "Minimum 2 characters required.";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName =
        "Last name is required.";
    } else if (form.lastName.trim().length < 2) {
      newErrors.lastName =
        "Minimum 2 characters required.";
    }

    if (!form.username.trim()) {
      newErrors.username =
        "Username is required.";
    } else if (form.username.trim().length < 3) {
      newErrors.username =
        "Minimum 3 characters required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required.";
    } else if (
      form.phone.replace(/\D/g, "").length < 7
    ) {
      newErrors.phone =
        "Phone must contain at least 7 digits.";
    }

    if (!String(form.age).trim()) {
      newErrors.age = "Age is required.";
    } else if (
      Number(form.age) < 1 ||
      Number(form.age) > 120
    ) {
      newErrors.age =
        "Age must be between 1 and 120.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      age: Number(form.age),
    });

    if (!edit) {
      setForm(emptyForm);
      setErrors({});
    }
  }

  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition ${
      errors[field]
        ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100"
        : "border-slate-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
    }`;

  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

    
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            
            <h2 className="text-xl font-bold text-slate-900">
              {edit
                ? "Edit"
                : "Add"}
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {edit
              ? "Update the user's information below."
              : "Fill in the information to create a new user."}
          </p>
        </div>

        {edit && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              First Name *
            </label>

            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="John"
              className={inputClass("firstName")}
            />

            {errors.firstName && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Last Name *
            </label>

            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className={inputClass("lastName")}
            />

            {errors.lastName && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.lastName}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Username *
            </label>

            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="john_doe"
              className={inputClass("username")}
            />

            {errors.username && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.username}
              </p>
            )}
          </div>

        
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email *
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={inputClass("email")}
            />

            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Phone *
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 555 123 4567"
              className={inputClass("phone")}
            />

            {errors.phone && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

         
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Age *
            </label>

            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="25"
              min="1"
              max="120"
              className={inputClass("age")}
            />

            {errors.age && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.age}
              </p>
            )}
          </div>
        </div>

    
        <div className="mt-7 flex flex-col-reverse justify-end gap-3 sm:flex-row">
          {edit && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}

            {loading
              ? "Saving..."
              : edit
              ? "Update"
              : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
