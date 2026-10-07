import React, { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !details.trim()) {
      return;
    }

    const newNote = {
      id: Date.now(),
      title,
      details,
    };

    setTask((prev) => [...prev, newNote]);

    setTitle("");
    setDetails("");
  };

  // Delete a particular note
  const deleteNote = (id) => {
    setTask((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#111] text-white">
      {/* ================= HEADER ================= */}
      {/* ================= ADD NOTE ================= */}
<section className="min-h-[70vh] flex flex-col items-center justify-center px-6">
  {/* Heading */}
  <div className="text-center mb-8">
    <p className="text-sm text-gray-400 uppercase mt-10 tracking-[4px]">
      My Workspace
    </p>

    <h1 className="text-4xl md:text-5xl font-bold mt-2">
      Add Notes
    </h1>

    <p className="text-gray-400 mt-3">
      Write down your ideas, tasks and important thoughts.
    </p>
  </div>

  {/* Form */}
  <form
    onSubmit={submitHandler}
    className="w-full max-w-2xl
               bg-[#1c1c1c]
               border border-gray-800
               rounded-2xl
               p-6 md:p-8
               shadow-2xl"
  >
    {/* Title */}
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-300 mb-2">
        Note Title
      </label>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Enter your note title..."
        className="w-full px-5 py-3.5 rounded-xl
                   bg-[#111] border border-gray-700
                   text-white placeholder-gray-500
                   outline-none transition
                   focus:border-blue-500
                   focus:ring-2 focus:ring-blue-500/20"
      />
    </div>

    {/* Details */}
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-300 mb-2">
        Details
      </label>

      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Write your thoughts here..."
        className="w-full h-32 px-5 py-3.5 rounded-xl
                   bg-[#111] border border-gray-700
                   text-white placeholder-gray-500
                   outline-none resize-none transition
                   focus:border-blue-500
                   focus:ring-2 focus:ring-blue-500/20"
      />
    </div>

    {/* Button */}
    <button
      type="submit"
      className="w-full bg-white text-black
                 font-bold px-7 py-3
                 rounded-xl
                 hover:bg-gray-200
                 active:scale-95
                 transition-all"
    >
      + Add Note
    </button>
  </form>
</section>

      {/* ================= NOTES ================= */}
      <section className="px-6 md:px-12 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              Your Notes
            </h2>

            <p className="text-gray-500 mt-1">
              {task.length} {task.length === 1 ? "note" : "notes"}
            </p>
          </div>
        </div>

        {/* Empty State */}
        {task.length === 0 && (
          <div className="border border-dashed border-gray-700 rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">📝</div>

            <h3 className="text-xl font-semibold">
              No notes yet
            </h3>

            <p className="text-gray-500 mt-2">
              Create your first note using the form above.
            </p>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {task.map((item, index) => (
            <div
              key={item.id}
              className={`relative group
                min-h-[400px]
                p-5 pt-7
                bg-[#fffdf0]
                text-gray-900
                rounded-sm
                shadow-[8px_10px_20px_rgba(0,0,0,0.35)]
                transition-all duration-300
                hover:-translate-y-3
                hover:rotate-0
                ${
                  index % 2 === 0
                    ? "rotate-1"
                    : "-rotate-1"
                }
              `}
            >
              {/* Tape */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2
                           w-24 h-8
                           bg-yellow-200/80
                           rotate-[-2deg]
                           shadow-sm"
              ></div>

              {/* Image */}
              <div className="w-full h-36 mb-5 overflow-hidden">
                <img
                  src={`https://picsum.photos/500/300?random=${item.id}`}
                  alt="Note"
                  className="w-full h-full object-cover
                             grayscale-[20%]
                             group-hover:scale-105
                             transition-transform duration-500"
                />
              </div>

              {/* Date */}
              <p className="text-xs text-gray-500 mb-2">
                NOTE #{index + 1}
              </p>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 break-words">
                {item.title}
              </h3>

              {/* Details */}
              <p className="text-gray-700 leading-7 break-words">
                {item.details}
              </p>

              {/* Bottom line */}
              <div className="absolute bottom-5 left-5 right-5 border-t border-dashed border-gray-300"></div>

              {/* Delete Button */}
              <button
                onClick={() => deleteNote(item.id)}
                className="absolute
                           bottom-[-15px]
                           right-[-15px]
                           w-11 h-11
                           rounded-full
                           bg-red-500
                           text-white
                           shadow-lg
                           opacity-0
                           group-hover:opacity-100
                           hover:bg-red-600
                           hover:scale-110
                           active:scale-90
                           transition-all duration-200"
                title="Delete note"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;