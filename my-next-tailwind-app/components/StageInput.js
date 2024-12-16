export default function StageInput({ stageName, setStageName, addStage }) {
    return (
      <div className="flex mb-4">
        <input
          type="text"
          value={stageName}
          onChange={(e) => setStageName(e.target.value)}
          className="flex-grow border p-2 rounded-l"
          placeholder="Nazwa etapu"
        />
        <button
          onClick={addStage}
          className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600"
        >
          Dodaj Etap
        </button>
      </div>
    );
  }
  