import React from 'react'; 
import { useGetProjectDetailsQuery } from '../services/api';

const Project = () => {
const {data} = useGetProjectDetailsQuery("e-commerce-website-us-client");
  return (
    <div className="py-40">
        <h1>Task Manager</h1>
      <div className="container"></div>
    </div>
  )
}

export default Project;