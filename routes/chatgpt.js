var express = require('express');
var router = express.Router();
require('dotenv').config();
//var { Configuration, OpenAIApi } from "openai";
var ai = require('openai')
const configuration = new ai.Configuration({
    organization: process.env.REACT_APP_ORGANIZATION_KEY,
    apiKey: process.env.CHATGPT_KEY,
});
const openai = new ai.OpenAIApi(configuration)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`ChatGPT ${process.env.REACT_APP_ORGANIZATION_KEY} :: ${process.env.CHATGPT_KEY}`);
});

router.get('/listmodels', function(req, res, next) {
    const response = openai.listModels();
    res.send(JSON.stringify(response))
})

router.get('/completions', function(req, res, next) {
    //const response = openai.createCompletion()
})

module.exports = router;
