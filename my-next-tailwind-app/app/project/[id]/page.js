"use client";

import { useState, use, useEffect } from "react";
import StageInput from "@/components/StageInput";
import StageList from "@/components/StageList";
import { useProjectContext } from "@/app/context/ProjectContext";

export default function ProjectPage({ params }) {
  const { getProjectById } = useProjectContext();
  const unwrappedParams = use(params);
  
  // Konwersja id na liczbę
  const projectId = Number(unwrappedParams.id);
  const project = getProjectById(projectId);

  const [stages, setStages] = useState([]);
  const [stageName, setStageName] = useState("");

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl text-red-500">Projekt nie został znaleziony</h1>
      </div>
    );
  }

  useEffect(() => {
    const savedStages = localStorage.getItem(`stages-${projectId}`);
    if (savedStages) {
      setStages(JSON.parse(savedStages));
    }
  }, [projectId]);

  // 🔹 Aktualizacja `localStorage` za każdym razem, gdy `stages` się zmienia
  useEffect(() => {
    if (stages.length > 0) {
      localStorage.setItem(`stages-${projectId}`, JSON.stringify(stages));
    }
  }, [stages, projectId]);

  const addStage = (name) => {
    if (!name.trim()) return;
    const newStage = { id: Date.now(), name, goals: [] };
    setStages((prevStages) => {
      const updatedStages = [...prevStages, newStage];
      localStorage.setItem(`stages-${projectId}`, JSON.stringify(updatedStages)); // 👈 Ręczny zapis
      return updatedStages;
    });
    setStageName("");
  };

  const addGoal = (stageId, goalText) => {
    if (!goalText.trim()) return;
    setStages((prevStages) => {
      const updatedStages = prevStages.map((stage) =>
        stage.id === stageId
          ? { ...stage, goals: [...stage.goals, { text: goalText, completed: false }] }
          : stage
      );
      localStorage.setItem(`stages-${projectId}`, JSON.stringify(updatedStages)); // 👈 Ręczny zapis
      return updatedStages;
    });
  };


  const deleteStage = (stageId) => {
    setStages((prevStages) => {
      const updatedStages = prevStages.filter((stage) => stage.id !== stageId);
      localStorage.setItem(`stages-${projectId}`, JSON.stringify(updatedStages));
      return updatedStages;
    });
  };
  
  const deleteGoal = (stageId, goalIndex) => {
    setStages((prevStages) => {
      const updatedStages = prevStages.map((stage) => {
        if (stage.id === stageId) {
          return { ...stage, goals: stage.goals.filter((_, index) => index !== goalIndex) };
        }
        return stage;
      });
      localStorage.setItem(`stages-${projectId}`, JSON.stringify(updatedStages));
      return updatedStages;
    });
  };
  
  const editGoal = (stageId, goalIndex, newText) => {
    setStages((prevStages) => {
      const updatedStages = prevStages.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              goals: stage.goals.map((goal, index) =>
                index === goalIndex ? { ...goal, text: newText } : goal
              ),
            }
          : stage
      );
      localStorage.setItem(`stages-${projectId}`, JSON.stringify(updatedStages));
      return updatedStages;
    });
  };
  

  const toggleGoal = (stageId, goalIndex) => {
    setStages((prevStages) => {
      const updatedStages = prevStages.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              goals: stage.goals.map((goal, index) =>
                index === goalIndex ? { ...goal, completed: !goal.completed } : goal
              ),
            }
          : stage
      );
      localStorage.setItem(`stages-${projectId}`, JSON.stringify(updatedStages));
      return updatedStages;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Projekt {project.name}</h1>
      <StageInput
        stageName={stageName}
        setStageName={setStageName}
        addStage={() => addStage(stageName)} 
      />
      <StageList
        stages={stages}
        addGoal={addGoal}
        toggleGoal={toggleGoal}
        deleteGoal={deleteGoal}
        editGoal={editGoal}
        deleteStage={deleteStage}
      />
    </div>
  );
}
