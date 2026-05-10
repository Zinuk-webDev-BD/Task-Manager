const { generateSlug } = require("../helpers/utils");
const authSchema = require("../models/authSchema");
const projectSchema = require("../models/projectSchema");

const createProject = async (req, res) => {
  const {title, description} = req.body;

  try {
    const slug = generateSlug(title);
    const project = await projectSchema({
     title,
     description,
     slug,
     author: req.user._id,
    });

    project.save();
   res.status(200).send({ message: "Project created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server is error" });
  }
};

const projectList = async (req, res) => {
  try {
    const { search } = req.query;
    const projects = await projectSchema.find({ 
      $or: [
        {author:  req.user._id }, 
        { members: req.user._id },
      ],
      title: {
      $regex: search || " ", $options: "i"
    }
  }).populate("author members", "fullName avatar").select("title description tasks._id slug");
    if(!projects) return res.status(400).send({ message: "project not found" });
     res.status(200).send({ projects })
  } catch (error) {
    res.status(500).send({ message: "Internal server is error" });
  }
};

const projectDetails = async (req, res) => {
  const { slug } = req.params;
try {
  const project = await projectSchema.findOne({
    $or: [{ author:  req.user._id },  { members: req.user._id }], 
    slug, 
  }).populate("author members", "fullName avatar");
  
  if(!project) {
    return res.status(404).send({ message: "Not found" });
  }
  res.status(200).send(project);
} catch (error) {
  console.log(error);
}
};


const addTeamMembersToProject = async (req, res) => {
  const { email, projectId } =  req.body;
  try {
    const existEmail = await authSchema.findOne({ email });
    if(!existEmail) return res.status(400).send({ message: "email is not exist" });


    const existMembers = await projectSchema.findOne({
     _id: projectId,
      $or: [
        { author:  existEmail._id }, 
        { members: existEmail._id },
      ],
    });

    if(existMembers) return res.status(400).send({message: "this member is already exit"});
    const project = await projectSchema.findOneAndUpdate({ _id: projectId }, { members: existEmail._id }, {new: true});
    if(!project) return res.status(400).send({ message: "invalid request" });

    res.status(200).send({ message: "team members added successfully" });

  } catch (error) {
     console.log(error);
     res.status(500).send({ message: "Internal server is error" });
  }
};

const addTaskToProject = async (req, res) => {
  const { title, description, priority, assignedTo, projectId } = req.body;
  try {
    if(!title) 
      return res.status(400).send({ message: "Task title is required" });
    if(!description) 
      return res.status(400).send({ message: "Task Description is required" });
    if(!priority) 
      return res.status(400).send({ message: "Task Priority is required" });
    if(!["high", "mid", "low"].includes(priority))
      return res.status(400).send({ message: "Invalid Priority value" });
    if(!projectId) 
      return res.status(400).send({ message: "Project is not found" });

    if(assignedTo && !Array.isArray(assignedTo)) 
    return res.status(400).send({ message: "Invalid assigned data" });
    
     if(assignedTo) {
      
      for (const userId of assignedTo) {

        const existMembers = await projectSchema.findOne({
      _id: projectId,    
      $or: [
        { author: projectId }, 
        { members: projectId },
      ],
    });
      if(existMembers) 
        return res.status(400).send({ message: "Invalid user" });  
      }  
     }

   const projectData = await projectSchema.findOneAndUpdate(
    { _id: projectId },
    { $push: { tasks: {title, description, priority, assignedTo} } },
    { returnDocument: "after" },
   );

   if(!projectData) return res.status(400).send({ message: "Project not found" }); 
   res.status(200).send({ message: "project created successfully" });

  } catch (error) {
    console.log(error);
  }
}




module.exports = { createProject, projectList, addTeamMembersToProject, addTaskToProject, projectDetails };