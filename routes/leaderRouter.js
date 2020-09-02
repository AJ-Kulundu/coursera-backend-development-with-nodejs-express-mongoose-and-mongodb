const express = require('express')
const bodyparser = require('body-parser')

leaderRouter = express.Router();

leaderRouter
.all('/',(req,res,next) =>{
    res.statuscode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get('/',(req,res,next) => {
    res.end('Will send all leaders to you!');
})
.post('/',(req,res,next) => {
    res.end('We will add  the '+req.body.name+ ' with details: ' +req.body.description);
})
.put('/',(req,res,next) => {
    res.end('PUT operation not supported on /leaders');
})
.delete('/',(req,res,next) => {
    res.end('Deleting all Leaders');
})
.get('/:leaderId',(req,res,next) =>{
    res.end('Will send all leaders to you! ' +req.params.leaderId+ ' to you!');
})
.post('/:leaderId',(req,res,next) =>{
    res.end('POST operations not supported on /leaders/'+req.params.leaderId);
})
.put('/:leaderId',(req,res,next) =>{
    res.write('Updating the leader: '+req.params.dishId+ '\n');
    res.end('Will update the leader: ' +req.body.name+ ' with details: ' +req.body.description);
})
.delete('/:leaderId',(req,res,next) =>{
    res.end('Deleting leader:' +req.params.leaderId)
});

module.exports = leaderRouter;