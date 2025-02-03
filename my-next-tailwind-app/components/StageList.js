import { useState } from "react";

export default function StageList({
  stages,
  addGoal,
  toggleGoal,
  deleteGoal,
  editGoal,
  deleteStage,
}) {
  const [goalInputs, setGoalInputs] = useState({}); // lokalny stan dla inputów

  const handleInputChange = (stageId, value) => {
    setGoalInputs((prev) => ({ ...prev, [stageId]: value }));
  };

  const [editMode, setEditMode] = useState(null); // tryb edycji celu
  const [editedText, setEditedText] = useState(""); // tekst edytowanego celu
  

  return (
    <div className="w-full">
      {stages.map((stage) => (
        <div key={stage.id} className="mb-6 bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">{stage.name}</h2>
            <button
              onClick={() => deleteStage(stage.id)}
              className="text-red-500 hover:text-red-700"
            >
              Usuń Etap
            </button>
          </div>
          <div className="flex mb-2">
            <input
              type="text"
              value={goalInputs[stage.id] || ""}
              onChange={(e) => handleInputChange(stage.id, e.target.value)}
              className="flex-grow border p-2 rounded-l"
              placeholder="Cel etapu"
            />
            <button
              onClick={() => {
                addGoal(stage.id, goalInputs[stage.id] || "");
                handleInputChange(stage.id, "");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
            >
              Dodaj Cel
            </button>
          </div>
          <ul>
            {stage.goals.map((goal, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => toggleGoal(stage.id, index)}
                    className="mr-2"
                  />
                  {editMode === `${stage.id}-${index}` ? (
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="border p-1"
                    />
                  ) : (
                    <span
                      className={`${
                        goal.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {goal.text}
                    </span>
                  )}
                </div>
                <div>
                  {editMode === `${stage.id}-${index}` ? (
                    <button
                      onClick={() => {
                        editGoal(stage.id, index, editedText);
                        setEditMode(null);
                      }}
                      className="text-green-500 hover:text-green-700 mr-2"
                    >
                      Zapisz
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditMode(`${stage.id}-${index}`);
                        setEditedText(goal.text);
                      }}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edytuj
                    </button>
                  )}
                  <button
                    onClick={() => deleteGoal(stage.id, index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Usuń
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
