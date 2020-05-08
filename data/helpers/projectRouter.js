const express = require('express');

const router = express.Router();

const Project = require('./projectModel');
const Action = require('./actionModel');

//users
router.get('/', (req, res) => {
    Project.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving the users.' })
    })
  });








 module.exports = router;