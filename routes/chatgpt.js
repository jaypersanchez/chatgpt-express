var express = require('express');
var router = express.Router();
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: process.env.REACT_APP_ORGANIZATION_KEY,
    apiKey: process.env.CHATGPT_KEY2,
});
const openai = new OpenAIApi(configuration)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`ChatGPT ${configuration.apiKey} :: ${configuration.organization}`);
});

router.get('/listmodels', function(req, res, next) {
    openai.listModels()
    .then(result => {
        res.send(result.data)
    }) 
})

router.get('/textcompletion', function(req, res, next) {
    getTextCompletion(req)
    .then((result) => {
        console.log(result)
        res.send(result)
    })
})

router.get('/codecompletion', function(req, res) {

})

router.get('/chatcompletion', function(req, res) {

})

/* Code Completion */
const getCodeCompletion = async(req) => {

}

/* Chat Completion */
const getChatCompletion = async(req) => {

}

/* Text Completion */
const getTextCompletion = async (req) => {
    var completion = await openai.createCompletion({
        model: req.body.model,
        prompt: req.body.prompt,
        temperature: req.body.temperature,
        max_tokens: req.body.max_tokens,
        max_tokens: 500, 
    })
    return(completion.data.choices[0].text)
}

module.exports = router;
