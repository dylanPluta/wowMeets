const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    userName: String,
    realm: String,
    postType: String,
    posterId: Number,
    title: String,
    content: String,
    timeDate: String,
    id: Number
});

const PostModel = mongoose.model("posts", PostSchema);
module.exports = PostModel;