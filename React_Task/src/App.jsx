import { useState, useEffect, useMemo } from "react";
import Form from "./components/Form";
import List from "./components/List";
import Login from "./components/Login";
import { useUsers } from "./hook/useUsers";
import Pagination from "./components/Pagination";

const USERS_PER_PAGE = 8;

function App() {
  const {
    token,
    users,
    loading,
    error,
    addUser,
    update,
    remove,
    logout,
  } = useUsers();

  const [edit, setEdit] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter((user) => {
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

      return (
        String(user.id).toLowerCase().includes(query) ||
        fullName.toLowerCase().includes(query)
      );
    });
  }, [users, search]);

  const totalPages = Math.max(1,Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  );

  const visibleUsers = useMemo(() => {
    const start = (currentPage - 1) * USERS_PER_PAGE;

    return filteredUsers.slice(start, start + USERS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  async function handleSubmit(formData) {
    if (edit) {
      const result = await update(
        edit.id,
        formData
      );

      if (result.success) {
       
        setEdit(null);
        setShowForm(false);
       
      }

      return;
    }

    const result = await addUser(formData);

    if (result.success) {
      console.log(result.data, "new user");

      setCurrentPage(1);
      setShowForm(false);
    }
  }

  function handleEdit(user) {
    setEdit(user);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setEdit(null);
    setShowForm(false);
  }

  async function handleDelete(user) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
    );

    if (!confirmed) return;

    setDeleteId(user.id);

    const result = await remove(user.id);

    setDeleteId(null);

    if (result.success) {
      if (
        edit &&
        String(edit.id) === String(user.id)
      ) {
        setEdit(null);
      }
    }
  }
  if (!token) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-blue-50">

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm backdrop-blur">
        <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">
            <div className=" sm:block">
              <h1 className="text-lg font-bold text-slate-900">
                User Management
              </h1>
            </div>
          </div>
     
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search User..."
              aria-label="Search users by ID or name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none  sm:w-64"/>
         
          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600">
            Logout
          </button>
        </div>
      </header>


      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {(edit || showForm) && (
          <Form edit={edit} onCancel={handleCancelEdit} onSubmit={handleSubmit} />
        )}
        <section>

          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <div className="flex items-center gap-3">

                <h2 className="text-2xl font-bold text-slate-900">Users</h2>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
                  {filteredUsers.length}
                </span>

              </div>

            </div>

            {!edit && (
              <button
                type="button"
                onClick={() => setShowForm((open) => !open)}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white "
              >
                {showForm ? "Close Form" : "Add User"}
              </button>
            )}

       
          </div>

          {!loading && !error && filteredUsers.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              {users.length === 0
                ? "No users found."
                : "No users match y"}
            </p>
          ) : (
            <List
              users={visibleUsers}
              loading={loading}
              error={error}
              onEdit={handleEdit}
              onDelete={handleDelete}
              deletingId={deleteId}
            />
          )}

          {!loading &&
            !error &&
            users.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}

        </section>
      </main>
    </div>
  );
}

export default App;