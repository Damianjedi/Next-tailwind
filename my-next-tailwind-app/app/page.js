"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectInput from "@/components/ProjectInput";
import { useProjectContext } from "@/app/context/ProjectContext";

export default function Home() {
  const [projectName, setProjectName] = useState("");
  const { projects, addProject } = useProjectContext();
  const router = useRouter();

  const handleAddProject = () => {
    if (projectName.trim() === "") return;
    addProject(projectName);
    setProjectName("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Twoje Projekty</h1>
        <ProjectInput
          projectName={projectName}
          setProjectName={setProjectName}
          addProject={handleAddProject}
        />
        <ul className="mt-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className="p-3 bg-gray-100 mb-2 rounded cursor-pointer hover:bg-gray-200"
              onClick={() => router.push(`/project/${project.id}`)}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
