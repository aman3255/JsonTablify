const express = require('express');
const csvData = require('../../controllers/csv.controller');
const urlData = require('../../controllers/url.controller');
const jsonData = require('../../controllers/json.controller');

const jsonRouter = express.Router();

jsonRouter.post('/rawjson', jsonData);
jsonRouter.post('/urljson', urlData);
jsonRouter.get('/csv', csvData);

module.exports = jsonRouter;