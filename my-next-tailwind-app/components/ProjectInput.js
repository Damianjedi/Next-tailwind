export default function ProjectInput({ projectName, setProjectName, addProject }) {
  return (
    <div className="flex">
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="flex-grow border p-2 rounded-l"
        placeholder="Nazwa projektu"
      />
      <button
        onClick={addProject}
        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
      >
        Dodaj Projekt
      </button>
    </div>
  );
}

