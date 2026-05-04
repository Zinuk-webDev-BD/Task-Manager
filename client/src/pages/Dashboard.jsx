import React, { useState } from "react";
import TaskCard from "../components/ui/TaskCard";
import { useGetProfileQuery, useGetProjectListQuery } from "../services/api";
import Loader from "../components/ui/Loader";
import { Navigate } from "react-router";
import Button from "../components/ui/Button";
import CreateProject from "../components/ui/CreateProject";
const Dashboard = () => {
  const { data, isLoading } = useGetProfileQuery();
  const { data: projectList, isLoading: projectLoading } =
    useGetProjectListQuery();

  const [modal, setModal] = useState(false);

  if (isLoading) return <Loader />;

  if (!data) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="">
      <Button
        onClick={() => setModal(true)}
        className="fixed bottom-10 right-5"
        size="lg"
      >
        + Create Project
      </Button>
      <div className=" py-8 bg-amber-400">
        <div className="container flex justify-between">
          <h1 className="text-4xl">Task Manager</h1>
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs">
              {data?.avatar ? (
                <img src={data.avatar} alt="profile" />
              ) : (
                data?.fullName?.charAt(0)
              )}
            </div>
            <h2 className="text-white font-bold">{data?.fullName}</h2>
          </div>
        </div>
      </div>
      <div className="container grid grid-cols-4 gap-6 pt-20">
        {projectList?.projects.map((project) => (
          <TaskCard key={project._id} project={project} />
        ))}
      </div>
      {modal && <CreateProject modal={(mode) => setModal(mode)} />}
    </div>
  );
};

export default Dashboard;