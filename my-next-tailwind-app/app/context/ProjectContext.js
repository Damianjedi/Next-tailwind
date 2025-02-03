"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
  }, []);

  // Aktualizacja localStorage przy każdej zmianie projektów
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (name) => {
    const newProject = { id: Date.now(), name };
    setProjects([...projects, newProject]);
  };

  const getProjectById = (id) => projects.find((project) => project.id === id);

  return (
    <ProjectContext.Provider value={{ projects, addProject, getProjectById }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
