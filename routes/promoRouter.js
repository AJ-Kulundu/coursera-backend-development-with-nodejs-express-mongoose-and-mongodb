const express = require('express')
const bodyparser = require('body-parser')

promoRouter = express.Router();

promoRouter
.all('/',(req,res,next) =>{
    res.statuscode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotions to you!');
})
.post('/',(req,res,next) => {
    res.end('We will add  the '+req.body.name+ ' with details: ' +req.body.description);
})
.put('/',(req,res,next) => {
    res.end('PUT operation not supported on /promotions');
})
.delete('/',(req,res,next) => {
    res.end('Deleting all promotions');
})
.get('/:promotionsId',(req,res,next) =>{
    res.end('Will send all promotions to you! ' +req.params.promotionsId+ ' to you!')
})
.post('/:promotionsId',(req,res,next) =>{
    res.end('POST operations not supported on /promotions/' +req.params.promotionsId);
})
.put('/:promotionsId',(req,res,next) =>{
    res.write('Updating the promotions: '+req.params.promotionsId+ '\n');
    res.end('Will update the leader: '+req.body.name+' with details: '+req.body.descriotion);
})
.delete('/:promotionsId',(req,res,next) =>{
    res.end('Deleting the dish:' +req.params.promotionsId);
});

module.exports = promoRouter;