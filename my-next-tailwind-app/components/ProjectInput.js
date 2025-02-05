export default function ProjectInput({ projectName, setProjectName, addProject }) {
  return (
    <div className="flex">
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="flex-grow border border-gray-300 p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-150"
        placeholder="Nazwa projektu"
      />
      <button
        onClick={addProject}
        className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
      >
        Dodaj Projekt
      </button>
    </div>
  );
}