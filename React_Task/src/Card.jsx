function Card({
  user,
  onEdit,
  onDelete,
  deleting,
}) {
  const fullName =
    `${user.firstName || ""} ${
      user.lastName || ""
    }`.trim();

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">

      <div className="h-10 bg-blue-600" />

      <div className="px-5 pb-5">

        
        <div className="mb-5">
          <h3 className="truncate text-lg font-bold text-slate-900">
            {fullName || "Unknown User"}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            @{user.username}
          </p>
        </div>


        <div className="space-y-3">

          <div className="flex items-center gap-3">
           

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase text-slate-500">
                Email
              </p>

              <p className="text-sm text-slate-500">
                {user.email || "—"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
          
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase text-slate-500">
                Phone
              </p>

              <p className=" text-sm text-slate-500">
                {user.phone || "—"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
           

            <div>
              <p className="text-[10px] font-bold uppercase text-slate-500">
                Age / ID
              </p>

              <p className="text-sm text-slate-500">
                {user.age || "—"} years 
              </p>
            </div>
          </div>
        </div>

    
        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-500 pt-5">
          <button type="button"  onClick={() => onEdit(user)}  disabled={deleting}  className="rounded-xl  bg-blue-50 px-4 py-2.5 text-sm font-semibold  ">
             Edit
          </button>
    
          <button
            type="button"
            onClick={() => onDelete(user)}
            disabled={deleting}
            className="rounded-xl bg-red px-4 py-2.5 text-sm font-semibold text-red-600 ">
          {deleting ? "Deleting..." : "Delete"}

                       
          </button>
        </div>
      </div>
           <div className="h-10 bg-blue-600" />
    </article>
  );
}

export default Card;
