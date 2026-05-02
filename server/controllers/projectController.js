const { generateSlug } = require("../helpers/utils");
const authSchema = require("../models/authSchema");
const projectSchema = require("../models/projectSchema");

const createProject = async (req, res) => {
  const { title, description } = req.body;
  try {
    const slug = generateSlug(title);
    const project = await projectSchema({
      title,
      description,
      slug,
      author: req.user._id,
    });
    project.save();

    res.status(200).send({ message: "Project Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

const projectList = async (req, res) => {
  try {
    const { search } = req.query;
    const projects = await projectSchema
      .find({
        $or: [{ author: req.user._id }, { members: req.user._id }],
        title: {
          $regex: search || "",
          $options: "i",
        },
      })
      .populate("author", "fullName avatar");

    if (!projects)
      return res.status(400).send({ message: "Project not found" });

    res.status(200).send({ projects });
  } catch (error) {
    console.log(error);

    res.status(500).send({ message: "Internal Server Error!" });
  }
};

const addTeamMemberToProject = async (req, res) => {
  const { email, projectId } = req.body;
  try {
    const existEmail = await authSchema.findOne({ email });
    if (!existEmail)
      return res.status(400).send({ message: "Email not exist" });

    const existMember = await projectSchema.findOne({
      _id: projectId,
      $or: [{ author: existEmail._id }, { members: existEmail._id }],
    });
    if (existMember)
      return res.status(400).send({ message: "This Member already exist" });
    const project = await projectSchema.findOneAndUpdate(
      { _id: projectId },
      { members: existEmail._id },
      { new: true },
    );
    if (!project) return res.status(400).send({ message: "Invalid Request" });

    res.status(200).send({ message: "Team Mebmer added successfylly" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

const addTaskToProject = async (req, res) => {
  const { title, description, priority, assignedTo, projectId } = req.body;
  try {
    if (!title)
      return res.status(400).send({ message: "Task Title is required" });
    if (!description)
      return res.status(400).send({ message: "Task Description is required" });
    if (!priority)
      return res.status(400).send({ message: "Task Priority is required" });
    if (!["mid", "low", "high"].includes(priority))
      return res.status(400).send({ message: "Invalid priority value" });
    if (!projectId)
      return res.status(400).send({ message: "Project not found" });

    if (assignedTo && !Array.isArray(assignedTo))
      return res.status(400).send({ message: "Invalid assigned data" });

    if (assignedTo) {
      for (const userId of assignedTo) {
        const existMember = await projectSchema.findOne({
          _id: projectId,
          $or: [{ author: userId }, { members: userId }],
        });

        if (!existMember)
          return res.status(400).send({ message: "Invalid User" });
      }
    }
    
    const projectData = await projectSchema.findOneAndUpdate(
      { _id: projectId },
      { tasks: { title, description, priority, assignedTo } },
      { returnDocument: "after" },
    );
    if (!projectData)
      return res.status(400).send({ message: "Project not found" });

    res
      .status(200)
      .send({ message: "Project created successfylly", projectData });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProject,
  projectList,
  addTeamMemberToProject,
  addTaskToProject,
};