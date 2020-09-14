const express = require('express')
const bodyparser = require('body-parser')
const Leaders = require('../models/leaders');
const Promotions = require('../models/promotions');
const authenticate = require('../authenticate');

leaderRouter = express.Router();

leaderRouter
.get('/',(req,res,next) => {
    Leaders.find({})
    .then((leaders) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post('/',authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Leaders.create(req.body)
    .then((leader) => {
    console.log('Leaders ', leader)
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(leader)
    },(err) => next(err))
    .catch((err) => next(err));
})
.put('/',authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete('/',authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Leaders.remove({})
    .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.get('/:leaderId',authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
   Leaders.findById(req.params.leaderId)
   .then((leader) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(leader);
   }, (err) => next(err))
   .catch((err) => next(err));
})
.post('/:leaderId',authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    res.status(403);
    res.end('POST operations not supported on /leaders/'+req.params.leaderId);
})
.put('/:leaderId',authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    Leaders.findByIdAndUpdate(req.params.leaderId,{$set:req.body}, {new:true})
    .then((leader) => {
     res.statusCode = 200;
     res.setHeader('Content-Type','application/json');
     res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete('/:leaderId',authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    Leaders.findByIdAndRemove(req.params.leaderId)
   .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));
});

module.exports = leaderRouter;