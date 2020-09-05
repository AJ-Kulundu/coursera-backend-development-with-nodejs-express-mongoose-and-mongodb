const express = require('express');
const bodyparser = require('body-parser');
const Promotions = require('../models/promotions')

promoRouter = express.Router();

promoRouter
.get('/',(req,res,next) => {
   Promotions.find({})
   .then((promotions) =>{
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       res.json(promotions);
   }, (err) => next(err))
   .catch((err) => next(err));
})
.post('/',(req,res,next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('Promotion created ',promotion)
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put('/',(req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete('/',(req,res,next) => {
    Promotions.remove({})
    .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));  
})
.get('/:promotionsId',(req,res,next) =>{
    Promotions.findById(req.params.promotionsId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post('/:promotionsId',(req,res,next) =>{
    res.statusCode = 403;
    res.end('POST operations not supported on /promotions/' +req.params.promotionsId);
})
.put('/:promotionsId',(req,res,next) =>{
    Promotions.findByIdAndUpdate(req.params.promotionsId,{$set:req.body},{new:true})
    .then((promotion) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(promotion);
    },(err) => next(err))
    .catch((err) => next(err));
})
.delete('/:promotionsId',(req,res,next) =>{
   Promotions.findByIdAndRemove(req.params.promotionsId)
   .then((resp) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
   },(err) => next(err)) 
   .catch((err) => next(err));
});

module.exports = promoRouter;