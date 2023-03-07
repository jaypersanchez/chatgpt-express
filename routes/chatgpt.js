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

/* list all models available */
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

/* Translate natural language, taken from user audio, turning instructions into code*/
router.get('/codecompletion', function(req, res) {
    getCodeCompletion(req)
    .then(result => {
        res.send(result)
    })

})

/* Test out chat completion create if it really converse */
router.get('/askagent', function(req, res) {
    getTextCompletion(req)
    .then(response => {
        res.send(response)
    })
})

/* Use with Chatbots.  Must first create chat context*/
router.get('/createchatcontext', function(req, res) {
    createChatContext(req)
    .then(result => {
        res.send(result)
    })
})

/* Chat bot conversation */
/*const askAgent = async(req) {
    var botresponse = await openai.
}*/

/* Code Completion WIP.  Need some work*/
const getCodeCompletion = async(req) => {
    /* 
        Code completion can use one of two models: 
    */
    var codecompletion = await openai.createCompletion({
        model: req.body.model,
        prompt: req.body.prompt,
        temperature: req.body.temperature,
        max_tokens: req.body.max_tokens,
    })
    return(codecompletion.data)
}

/* Chat Completion */
const createChatContext = async(req) => {
    var chatcompletion = await openai.createChatCompletion({
        model: req.body.model,
        max_tokens: req.body.max_tokens,
        messages: req.body.messages,
    })
    return(chatcompletion.data)
}

/* Text Completion */
const getTextCompletion = async (req) => {
    var completion = await openai.createCompletion({
        model: req.body.model,
        prompt: req.body.prompt,
        temperature: req.body.temperature,
        max_tokens: req.body.max_tokens,
    })
    return(completion.data.choices[0].text)
}

module.exports = router;
