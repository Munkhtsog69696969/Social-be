const express = require('express');

const {Post}=require("../models/post.model")

const postRouter = express.Router();

const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: "dt2qlgnd6",
  api_key: "517613321561649",
  api_secret: "tnJ52HFFUf-WjX9bCD8i3SuCZWI"
});

const isLoggedIn=(req,res,next)=>{
    if(req.user){
        next();
    }else{
        res.redirect(process.env.CLIENT_SERVER);
    }
}

postRouter
    .post("/" , async(req,res)=>{
        const {text,imageUrl}=req.body;

        let result;
        let image;

        if(imageUrl){
            result=await cloudinary.uploader.upload(imageUrl , {folder:"images"});
            image=result.secure_url;
        }else{
            image="404"
        }

        const newPost=await Post.create({
            creator:"John Smith",
            text,
            imageUrl:image
        });

        res.json({
            message:"Created",
            post:newPost,
        })
    })
    .get("/" , async(req,res)=>{
        const posts=await Post.find({});

        res.json({
            message:"get",
            posts:posts
        })
    })
    .delete("/:id", async(req,res)=>{
        const id=req.params.id;

        await Post.findByIdAndRemove(id);

        const posts=await Post.find({})

        res.json({
            message:"deleted",
        })

    })
    .put("/:id",async(req,res)=>{
        const {newText}=req.body;

        const id=req.params.id

        const post=await Post.findById(id);

        post.text=newText;

        await post.save();

        res.json({
            message:"updated"
        })
    })
module.exports = postRouter;