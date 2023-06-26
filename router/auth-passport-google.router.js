const express = require('express');

const passport = require('passport');

const authGoogleRouter = express.Router();

authGoogleRouter
    .get("/google" , passport.authenticate("google" , {scope:["profile"]}))
    .get("/google/callback" , passport.authenticate("google" , {
        successRedirect:process.env.CLIENT_SERVER,
        failureRedirect:process.env.BACKEND_SERVER+"/auth/login/failure"
    }))
    .get("/login/success",(req,res)=>{
        if(req.user){
            res.json(req.user)
        }
    })
    .get("/login/failure",(req,res)=>{
        res.status(401).json({
            message:"Failed"
        })
    })
    .get("/logout",(req,res)=>{
        req.logout();
        req.session.destroy();
        res.redirect(process.env.CLIENT_SERVER);
    })
module.exports = authGoogleRouter;