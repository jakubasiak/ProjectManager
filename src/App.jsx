import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject"
import { useState } from "react";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  function handleAddTask(text) {
    setProjectsState(prev => {
      const taskId = Math.random();
      const newTask = {
        id: taskId,
        projectId: prev.selectedProjectId,
        text
      }

      return {
        ...prev,
        tasks: [...prev.tasks, newTask]
      }
    });
  }

  function handleDeleteTask(id) {
    setProjectsState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id)
    }))
  }

  function handleSelectProject(id) {
    setProjectsState(prev => ({
      ...prev,
      selectedProjectId: id
    }));
  }

  function handleStartNewProject() {
    setProjectsState(prev => ({
      ...prev,
      selectedProjectId: null
    }));
  }

  function handleCancelAddProject() {
    setProjectsState(prev => ({
      ...prev, selectedProjectId: undefined
    }));
  }

  function handleAddProject(projectData) {
    const newProject = { ...projectData, id: Math.random() };
    setProjectsState(prev => ({
      ...prev, selectedProjectId:
        undefined,
      projects: [...prev.projects, newProject]
    }));
  }

  function handleDeleteProject() {
    setProjectsState(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== prev.selectedProjectId),
      selectedProjectId: undefined
    }))
  }

  const selectedProject = projectsState.projects.find(p => p.id === projectsState.selectedProjectId);

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartNewProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId} />
      {projectsState.selectedProjectId === undefined &&
        <NoProjectSelected
          onStartAddProject={handleStartNewProject} />}
      {projectsState.selectedProjectId === null &&
        <NewProject
          onAdd={handleAddProject}
          onCancel={handleCancelAddProject} />}
      {projectsState.selectedProjectId &&
        <SelectedProject
          project={selectedProject}
          selectedProjectId={selectedProject.id}
          onDeleteProject={handleDeleteProject}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          tasks={projectsState.tasks} />}
    </main>
  );
}

export default App;
