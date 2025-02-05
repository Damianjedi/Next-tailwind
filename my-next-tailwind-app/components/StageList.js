import { useState } from "react";

export default function StageList({
  stages,
  addGoal,
  toggleGoal,
  deleteGoal,
  editGoal,
  deleteStage,
}) {
  const [goalInputs, setGoalInputs] = useState({}); 

  const handleInputChange = (stageId, value) => {
    setGoalInputs((prev) => ({ ...prev, [stageId]: value }));
  };

  const [editMode, setEditMode] = useState(null); 
  const [editedText, setEditedText] = useState(""); 
  

  return (
    <div className="w-full mt-30">
      {stages.map((stage) => (
        <div key={stage.id} className="mb-6 bg-white p-4 rounded shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">{stage.name}</h2>
            <button
              onClick={() => deleteStage(stage.id)}
              className="bg-red-500 text-white px-4 py-2 rounded transition duration-150 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Usuń Etap
            </button>
          </div>
          <div className="flex mb-2">
            <input
              type="text"
              value={goalInputs[stage.id] || ""}
              onChange={(e) => handleInputChange(stage.id, e.target.value)}
              className="flex-grow border border-gray-300 p-3 rounded-l focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-150"
              placeholder="Cel etapu"
            />
            <button
              onClick={() => {
                addGoal(stage.id, goalInputs[stage.id] || "");
                handleInputChange(stage.id, "");
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600"
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
