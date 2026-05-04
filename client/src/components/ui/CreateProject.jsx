import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import {
  useCreateProjectMutation,
  useGetProjectListQuery,
} from "../../services/api";

const CreateProject = ({ modal }) => {
  const { refetch } = useGetProjectListQuery();
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
  });
  const [createProject] = useCreateProjectMutation();
  const handelCreate = async (e) => {
    e.preventDefault();
    const res = await createProject(projectData);
    if (res.error) {
      console.log(res.error);
      return;
    }
    refetch();
    modal(false);
  };
  return (
    <div className="h-screen w-full bg-gray-700/40 fixed top-0 left-0 flex items-center justify-center">
      <form
        onSubmit={handelCreate}
        className="bg-white flex flex-col rounded-xl shadow space-y-4 max-w-md mx-auto p-6 w-full"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Create a new project
        </h2>
        <Input
          label="Project Title"
          type="text"
          placeholder="Project Title here"
          onChange={(e) =>
            setProjectData((prev) => ({ ...prev, title: e.target.value }))
          }
          //   error={}
        />
        <Input
          label="Project Description"
          type="text"
          placeholder="Project Description here"
          //   error={}
          onChange={(e) =>
            setProjectData((prev) => ({ ...prev, description: e.target.value }))
          }
        />

        <Button type="submit" fullWidth>
          Create Project
        </Button>
      </form>
    </div>
  );
};

export default CreateProject;