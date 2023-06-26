const session=require("express-session");
const passport=require("passport");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
require("./passport-auth/passort-google");

const app = express();
app.use(session({secret:"NetBalls"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({limit: '100mb'}));

app.use(cors({
    origin:process.env.CLIENT_SERVER,
    methods:"GET , POST , PUT , DELETE",
    credentials:true,
}));


const connect = require('./mongoDb/db.connector');

const port = process.env.PORT || 8080;

mongoose.set('strictQuery', false);

connect();

const authGoogleRouter=require("./router/auth-passport-google.router")

const postRouter=require("./router/post.router")

app.use("/auth",authGoogleRouter);

app.use("/" , postRouter);

app.listen(port, () => {
    console.log('Server listening at :', port);
});
