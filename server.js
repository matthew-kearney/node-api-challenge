const express = require("express");
const server = express();
 server.use(express.json());

 const projectRouter = require('./data/helpers/projectRouter');
 
 server.use('/api', projectRouter);

 server.get("/",  (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });

  module.exports = server;