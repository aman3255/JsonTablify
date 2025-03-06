const exppress = require('express');
const v1Router = exppress.Router();
const jsonRouter = require('./json.routes')

v1Router.use('/json', jsonRouter)
module.exports = v1Router;

