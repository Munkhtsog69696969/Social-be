const { Schema, Types, model } = require('mongoose');

const postSchema = new Schema({
    id:{
        type:String,
        required:true,
    },
    fullname:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
        required:true,
    },
    provider:{
        type:String,
        required:true,
    }
});

exports.User = model('users', postSchema);