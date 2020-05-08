const express = require('express');

const router = express.Router();

const Project = require('./projectModel');
const Action = require('./actionModel');

//get projects
router.get('/projects', (req, res) => {
    Project.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving the users.' })
    })
  });

//get actions
router.get('/actions', (req, res) => {
    Action.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving the actions.' })
    })
  });


//validate project
router.post('/', validateProject, (req, res) => {
    Project.insert(req.body)
    .then(projects => {
      res.status(201).json(projects)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error adding the project.' })
    })
  });

//validate action
router.post('/action', validateAction, (req, res) => {
    Action.insert(req.body)
    .then(projectAction => {
      res.status(201).json(projectAction)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error adding the post.' })
    })
  });

//get projects actions
  router.get('/:id/actions', (req, res) => {
    const { id } = req.params;
 
    Project.getProjectActions(id)
      .then(project => {
        if (project.length === 0) {
          res
            .status(404)
            .json({ message: 'The post with the specified ID does not exist.' });
        } else {
          return res.status(200).json(project);
        }
      })
      .catch(error => {
        console.log(error);
        res
          .status(500)
          .json({ error: 'The comments information could not be retrieved.' });
      });
  });


//update project


//custom middleware

function validateProject(req, res, next) {
    if (req.body) {
      if (req.body.name, req.body.description) {
        next();
      } else {
        res.status(400).json({ message: "Missing info" });
      }
    } else {
      res.status(400).json({ message: "Missing project data" });
    }
  }


  function validateAction(req, res, next) {
    if (req.body) {
      if (req.body.project_id, req.body.description, req.body.notes) {
        next();
      } else {
        res.status(400).json({ message: "Missing required text field" });
      }
    } else {
      res.status(400).json({ message: "Missing post data" });
      
    }
  }

  


 module.exports = router;