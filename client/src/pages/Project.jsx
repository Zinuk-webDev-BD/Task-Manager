import React, { useState } from 'react'; 
import { useGetProjectDetailsQuery } from '../services/api';
import Button from '../components/ui/Button';
import AssignedUsers from '../components/ui/AssignedUsers';
import PriorityBadge from '../components/ui/PriorityBadged';
import CreateTask from '../components/ui/CreateTask';
import { useParams } from 'react-router';
import Loader from '../components/ui/Loader';

const Project = () => {
const {slug} = useParams();  
const [modal, setModal] = useState(false);
const {data, isLoading} = useGetProjectDetailsQuery(slug);
if(isLoading) return <Loader />
  return (
    <div className="py-40">
      <div className="max-w-2xl m-auto">
        <div className="pb-2 border-b flex justify-between">
          <h1 className="text-2xl">Task Manager</h1>
          <Button>Add member</Button>
        </div>
        <div className="flex justify-between border-b">
          <div>
             <h2 className="text-xl pt-2">{data?.title}</h2>
             <p>{data?.description}</p>
              </div>
               <div>
                <div className="flex gap-2 items-center">
               Author:
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs border-2 border-white" >
                     {data?.author.avatar ? (
                        <img src= {data?.author.avatar} alt="profile" />
                     ): (
                        data?.author.fullName?.charAt(0)
                     )}
                 </div>
                  <h2 className="text-white font-bold">{data?.author.fullName}</h2>
               </div>
               <div>
                 Members:
                 {data?.members && data?.members.length > 0 && (<AssignedUsers members={data?.members} />)}
               </div>
            </div> 
         </div>
         <div className="py-20 space-y-4">
          <div className="flex justify-between">
            <h2 className="text-2xl">Task list</h2>
            <Button onClick={()=>setModal(true)}>Add task</Button>
          </div>
          {
            data?.tasks.map((item) => (
            <div key={item._id} className="bg-blue-300 p-5 rounded-xl flex justify-between">
             <div>
              <h2 className="text-2xl">{item?.title}</h2>
              <p>{item?.description}</p>
               Assigned to: <AssignedUsers members={item?.assignedTo} />
             </div>
             <div className="space-y-4">
              Priority: <PriorityBadge priority={item?.priority} />
              <p>{ item?.isComplete ? "completed": "incomplete" }</p>
               <Button>Assign member</Button>
             </div>
            </div>
            ))}
          </div>     
      </div>
      {modal && (<CreateTask modal={(mode) => setModal(mode)} projectId={data._id} members={data?.members} slug={slug} />)} 
    </div>
  )
}

export default Project;