function Pagination({currentPage, totalPages, onPageChange}){
     if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-500 bg-white p-4 sm:flex-row">

      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="w-full rounded-xl border border-slate-500 px-4 py-2.5 text-sm font-semibold text-slate-600 sm:w-auto"
      >
        ← Previous
      </button>

      <div className="flex flex-wrap justify-center gap-1.5">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`h-10 min-w-10 rounded-xl px-3 text-sm font-semibold ${
              currentPage === page
                ? "bg-blue-600 text-white "
                : "border border-slate-500 bg-white text-slate-600"
            }`}>
            {page}
          </button>
        ))}
      </div>
       <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="w-full rounded-xl border border-slate-500 px-4 py-2.5 text-sm font-semibold text-slate-600  sm:w-auto">
        Next →
      </button>
      </div>
  );
}
export default Pagination;