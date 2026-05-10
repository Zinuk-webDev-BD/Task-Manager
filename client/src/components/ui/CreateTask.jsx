import React, { useState } from 'react'
import Input from './Input';
import Button from './Button';
import { useAddNewTaskMutation, useCreateProjectMutation, useGetProjectDetailsQuery,} from '../../services/api';

const CreateTask = ({ modal, projectId, members, slug }) => {
  const { refetch } = useGetProjectDetailsQuery(slug);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "mid",
    assignedTo: [],
    projectId: projectId,
  });
  const [CreateTask] = useAddNewTaskMutation();
    const handleCreate = async (e) => {
     e.preventDefault();
     const res = await createProject(taskData);
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
          Create a new task
        </h2>
        <Input
          label="task title"
          type="text"
          placeholder="task title here"
          onChange={(e) => 
           setTaskData((prev) => ({ ...prev, title: e.target.value }))}     
        />
        <Input
          label="task description"
          type="text"
          placeholder="task description here"
          onChange={(e) => 
           setTaskData((prev) => ({ ...prev, description: e.target.value }))}    
        />
        <select
          clsssName="border"  
          onChange={(e) => 
           setTaskData((prev) => ({ ...prev, description: e.target.value }))} >
            <option value="high">high</option>
            <option value="mid">mid</option>
            <option value="low">low</option>
        </select>
         
         <select onChange={(e) => 
           setTaskData((prev) => ({ ...prev, assignedTo: [e.target.value] }))}>
            <option hidden>assign members</option>
            {members.map((item) => (
                 <option key={item._id} value={item._id}>{item?.fullName}</option>
                ))}
            
         </select>
         

        <Button
          type="submit" fullWidth>
        Create project
        </Button>
      </form>
    </div>
  )
}

export default CreateTask;