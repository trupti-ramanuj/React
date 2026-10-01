import { useState, useEffect, useMemo } from "react";
import Form from "./Form";
import List from "./List";
import Login from "./Login";
import { useUsers } from "./hook/useUsers";
import Pagination from "./Pagination";

const USERS_PER_PAGE = 8;

function App() {
  const {
    token,
    users,
    loading,
    error,
    actionLoading,
    addUser,
    update,
    remove,
    logout,
  } = useUsers();

  const [edit, setEdit] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [deleteId, setDeleteId] = useState(null);

  const totalPages = Math.max(1,Math.ceil(users.length / USERS_PER_PAGE)
  );

  const visibleUsers = useMemo(() => {
    const start = (currentPage - 1) * USERS_PER_PAGE;

    return users.slice(start, start + USERS_PER_PAGE);
  }, [users, currentPage]);

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
      }

      return;
    }

    const result = await addUser(formData);

    if (result.success) {
      setCurrentPage(1);
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
    <div className="min-h-screen bg-slate-50">

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900">
                User Management
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            Logout
          </button>

          

        </div>
      </header>


      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        <Form edit={edit} onSubmit={handleSubmit} onCancel={handleCancelEdit}  actionLoading={actionLoading} />

        <section>

          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <div className="flex items-center gap-3">

                <h2 className="text-2xl font-bold text-slate-900">Users</h2>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                  {users.length}
                </span>

              </div>

            </div>

            {!loading && users.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
                Showing{" "}
                <strong className="text-slate-800">
                  {visibleUsers.length}
                </strong>{" "}
                of{" "}
                <strong className="text-slate-800">
                  {users.length}
                </strong>
              </div>
            )}

          </div>

          <List
            users={visibleUsers}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deletingId={deleteId}
          />

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