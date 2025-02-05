export default function StageInput({ stageName, setStageName, addStage }) {
  return (
    <div className="flex items-center space-x-2 p-4 bg-white rounded shadow-md mb-20">
      <input
        type="text"
        value={stageName}
        onChange={(e) => setStageName(e.target.value)}
        className="flex-grow border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-150"
        placeholder="Nazwa etapu"
      />
      <button
        onClick={addStage}
        className="bg-green-500 text-white px-6 py-3 rounded transition duration-150 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        Dodaj Etap
      </button>
    </div>
  );
}