"use client";

import { useState } from "react";
import StageInput from "@/components/StageInput";
import StageList from "@/components/StageList";

export default function ProjectPage({ params }) {
  const [stages, setStages] = useState([]);
  const [stageName, setStageName] = useState("");
  const [goalName, setGoalName] = useState("");

  const addStage = () => {
    if (stageName.trim() === "") return;
    setStages([
      ...stages,
      { name: stageName, goals: [], id: Date.now() },
    ]);
    setStageName("");
  };

  const addGoal = (stageId, goalText) => {
    if (goalText.trim() === "") return;
    const updatedStages = stages.map((stage) =>
      stage.id === stageId
        ? { ...stage, goals: [...stage.goals, { text: goalText, completed: false }] }
        : stage
    );
    setStages(updatedStages);
  };


  const deleteStage = (stageId) => {
    const updatedStages = stages.filter((stage) => stage.id !== stageId);
    setStages(updatedStages);
  };
  
  const deleteGoal = (stageId, goalIndex) => {
    const updatedStages = stages.map((stage) => {
      if (stage.id === stageId) {
        const updatedGoals = stage.goals.filter((_, index) => index !== goalIndex);
        return { ...stage, goals: updatedGoals };
      }
      return stage;
    });
    setStages(updatedStages);
  };
  
  const editGoal = (stageId, goalIndex, newText) => {
    const updatedStages = stages.map((stage) => {
      if (stage.id === stageId) {
        const updatedGoals = stage.goals.map((goal, index) =>
          index === goalIndex ? { ...goal, text: newText } : goal
        );
        return { ...stage, goals: updatedGoals };
      }
      return stage;
    });
    setStages(updatedStages);
  };
  

  const toggleGoal = (stageId, goalIndex) => {
    const updatedStages = stages.map((stage) => {
      if (stage.id === stageId) {
        const updatedGoals = stage.goals.map((goal, index) =>
          index === goalIndex
            ? { ...goal, completed: !goal.completed }
            : goal
        );
        return { ...stage, goals: updatedGoals };
      }
      return stage;
    });
    setStages(updatedStages);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Projekt {params.id}</h1>
      <StageInput
        stageName={stageName}
        setStageName={setStageName}
        addStage={addStage}
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
