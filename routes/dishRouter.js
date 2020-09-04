const express = require('express')
const bodyparser = require('body-parser');
const Dishes = require('../models/dishes');
const { json } = require('express');

dishRouter =express.Router();

dishRouter
.get('/',(req,res,next) => {
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    },(err) => next(err))
    .catch((err) => next(err));
})
.post('/',(req, res, next) => {
    Dishes.create(req.body)
    .then((dish) => {
        console.log('Dish Created ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));

})
   
.put('/',(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete('/',(req, res, next) => {
   Dishes.remove({})
   .then((resp) =>{
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       res,json(resp)
   }, (err) => next(err))
   .catch((err) => next(err))
})
.get('/:dishId', (req,res,next) => {
   Dishes.findById(req.params.dishId)
   .then((dish) => {
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       res.json(dish);
   }, (err) => next(err))
   .catch((err) => next(err));
})
.post('/:dishId',(req,res,next) => {
  res.statusCode= 403;
  res.end('POST operation not supported on /dishes/'+req.params.dishId);
})
.put('/:dishId',(req,res,next) => {
   Dishes.findByIdAndUpdate(req.params.dishId,{$set:req.body},{new:true})
   .then((dish) => {
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       res.json(dish);
   }, (err ) => next(err))
   .catch((err) => next(err));
})
.delete('/:dishId',(req,res,next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.get('/:dishId/comments',(req,res,next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null) {
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(dish.comments);
        }else{
            err = new Error('Dish '+req.params.dishId+' not found');
            err.status = 404;
            return next(err)
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post('/:dishId/comments',(req,res,next) =>{
    Dishes.findById(req.params.dishId)
})
.put('/:dishId/comments',(req,res,next) =>{})
.delete('/:dishId/comments',(req,res,next) =>{})
.get('/:dishId/comments/:commentId',(req,res,next) =>{})
.post('/:dishId/comments/:commentId',(req,res,next) =>{})
.put('/:dishId/comments/:commentId',(req,res,next) =>{})
.delete('/:dishId/comments/:commentId',(req,res,next) =>{})

module.exports = dishRouter;