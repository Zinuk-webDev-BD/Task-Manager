import React, { useState } from 'react'
import Input from './Input';
import Button from './Button';
import { useCreateProjectMutation, useGetProjectListQuery } from '../../services/api';

const CreateProject = (modal) => {
  const { refetch } = useGetProjectListQuery()
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
  });
  const [CreateProject] = useCreateProjectMutation();
    const handleCreate = async (e) => {
     e.preventDefault();
     const res = await createProject(projectData);
     if(res.error) {console.log(res.error);
      return
     }
     refetch();
     modal(false);
    }
  return (
    <div className="h-screen w-full bg-gray-700/10 fixed top-0 left-0 flex items-center justify-center">
      <form
        onSubmit={handleCreate}
        className="max-w-md max-auto p-6 bg-blue-400 shadow space-y-4 rounded-xl w-full"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center">
          Create a new project
        </h2>
        <Input
          label="project title"
          type="text"
          placeholder="project title here"
          onChange={(e) => 
           setProjectData((prev) => ({ ...prev, title: e.target.value }))}     
        />
        <Input
          label="project description"
          type="text"
          placeholder="project description here"
          onChange={(e) => 
           setProjectData((prev) => ({ ...prev, description: e.target.value }))}    
        />
        <Button
          type="submit" fullWidth>
        Create project
        </Button>
      </form>
    </div>
  )
}

export default CreateProject;