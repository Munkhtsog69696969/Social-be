const { Schema, Types, model } = require('mongoose');

const postSchema = new Schema({
    creator:{
        // type:Schema.Types.ObjectId,
        // required:true,
        type:String,
    },
    text:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        default:new Date(),
    },
    imageUrl:{
        type:String,
    }
});

exports.Post = model('posts', postSchema);