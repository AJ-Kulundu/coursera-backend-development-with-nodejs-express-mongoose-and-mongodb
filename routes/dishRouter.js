const express = require('express')
const bodyparser = require('body-parser')

dishRouter =express.Router();

dishRouter
.all('/',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get('/',(req,res,next) => {
    res.end('Will send all the dishes to you!');
})
.post('/',(req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put('/',(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete('/',(req, res, next) => {
    res.end('Deleting all dishes');
})
.get('/:dishId', (req,res,next) => {
    res.end('Will send all the dishes to you! '+req.params.dishId+ ' to you.');
})
.post('/:dishId',(req,res,next) => {
  res.statusCode= 403;
  res.end('POST operation not supported on /dishes/'+req.params.dishId);
})
.put('/:dishId',(req,res,next) => {
    res.write('Updating the dish: '+req.params.dishId+ '\n');
    res.end('Will update the dish: ' +req.body.name+ ' with details: ' +req.body.description);
})
.delete('/:dishId',(req,res,next) => {
    res.end('deleting the dish: '+req.params.dishId);
});

module.exports = dishRouter;