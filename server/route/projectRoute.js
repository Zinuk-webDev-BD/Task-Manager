const express = require("express");
const { createProject, 
        projectList, 
        addTeamMembersToProject, 
        addTaskToProject, 
        projectDetails } = require("../controllers/projectController");
const router = express.Router();

router.post("/create", createProject);
router.get("/list", projectList);
router.get("/details/:slug", projectDetails);
router.post("/addmembers", addTeamMembersToProject)
router.post("/addtask", addTaskToProject);

module.exports = router;