const express = require('express');
const Favourites = require('../models/favourites');
const Dishes = require('../models/dishes')
const authenticate = require('../authenticate');

const router = express.Router();

router.route('/')
.get(authenticate.verifyUser,(req,res,next) =>{
    Favourites.find({'user': req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favourites)=>{
      res.status(200);
      res.setHeader('Content-Type','application/json');
      res.json(favourites)
    },(err) => next(err))
    .catch((err)=> next(err));
})
.post(authenticate.verifyUser,(req,res,next) =>{
     Favourites.findOne({'user': req.user._id})
     .then((favourites)=>{
         if(favourites){
             for(var i=0; i<req.body.length;i++){
                 if(favourites.dishes.indexOf(req.body[i]._id) === -1){
                     favourites.dishes.push(req.body[i]._id);
                 }
             }
             favourites.save()
             .then((favourites)=>{
                 console.log("Added to favourites", favourites);
                 res.status(200);
                 res.setHeader('Content-Type','application/json');
                 res.json(favourites);
             },(err) => next(err));
         }else{
          Favourites.create({"user":req.user._id,"dishes":req.body})
          .then((favourites)=>{
           console.log("favourite Created:", favourites);
           res.status(200);
           res.setHeader('Content-Type','application/json');
           res.json(favourites);
          },(err) => next(err))  

         }
     },(err) => next(err))
     .catch((err) => next(err));
})
.put(authenticate.verifyUser,(req,res)=>{
    res.status(403);
    res.end('PUT request not supported on /favourites')
})
.delete(authenticate.verifyUser,(req,res) => {
    Favourites.remove({user:req.user.id})
    .then((resp)=>{
        res.status(200);
        res.setHeader('Content-Type','application/json');
        res.json(resp)
    },(err) => next(err))
    .catch((err)=> next(err))
});

router.route('/:dishId')
.all(authenticate.verifyUser)
.get((req,res,next) =>{
    res.status(403);
    res.end('GET operation not supported on /favorites/'+ req.params.dishId);
})
.post((req,res,next) =>{
    Favourites.findOne({user:req.user._id})
    .then((favourites)=>{
        if(favourites){
          if(favourites.dishes.indexOf(req.params.dishId) === -1){
              favourites.dishes.push(req.params.dishId);
              favourites.save()
              .then((favourites) => { 
                console.log("Added to favourites", favourites);
                res.status(200);
                res.setHeader('Content-Type','application/json');
                res.json(favourites);
                },(err) => next(err));
           }
        }else{
            Favourites.create({"user":req.user._id, "dishes":[req.params.dishId]})
            .then((favourites)=>{
                console.log("Added to favourites", favourites);
                res.status(200);
                res.setHeader('Content-Type','application/json');
                res.json(favourites);
            },(err) => next(err));
        }
    },(err)=> next(err))
    .catch((err) => next(err))
})
.put((req,res,next) =>{
    res.status(403);
    res.end('PUT request not supported on /favourites/'+req.params.dishId);
})
.delete((req,res,next) => {
    Favourites.findOne({user:req.user._id})
    .then((favourite)=>{
        if(favourite){
            index = favourite.dishes.indexOf(req.params.dishId);
            if(index>=0){
                favourite.dishes.splice(index,1);
                favourite.save()
                .then((favourite)=>{
                    console.log("Favourite Deleted", favourite);
                    res.status(200);
                    res.setHeader('Content-Type','application/json');
                    res.json(favourite);
                },(err)=> next(err))
            }else{
            err = new Error('Dish ' +req.params.dishId+' not found ');
            res.status(404);
            return next(err);
            }
        }else{
        err = new Error('Favourites not found');
        res.status(404);
        return next(err);
        }
    },(err) => next(err))
    .catch((err)=> next(err));
})


module.exports = router;