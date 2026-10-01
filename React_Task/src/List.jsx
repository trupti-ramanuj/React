import Card from "./Card";

function UserList({
  users,
  loading,
  error,
  onEdit,
  onDelete,
  deletingId,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div className="h-20 animate-pulse bg-slate-200" />

            <div className="space-y-4 p-5">
              <div className="h-16 w-16  rounded-2xl bg-slaate-100" />
              <div className="h-5 w-32 rounded bg-slate-100" />
              <div className="h-4 w-full  rounded bg-slate-100" />
              <div className="h-4 w-4/5  rounded bg-slate-100" />
              <div className="h-10 w-full se rounded-xl bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
     
        <h3 className="text-lg font-bold text-red-900">
          Unable to load users
        </h3>

        <p className="mt-2 text-sm text-red-700">
          {error}
        </p>
      </div>
    );
  }



  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users.map((user) => (
        <Card
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
          deleting={
            String(deletingId) === String(user.id)
          }
        />
      ))}
    </div>
  );
}

export default UserList;
