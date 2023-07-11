const mongoose = require("mongoose")

const CommentsSchema = new mongoose.Schema({
    userName: String,
    commentorId: String,
    content: String,
    postId: String,
    timeDate: String,
    id: String
});

const CommentsModel = mongoose.model("comments", CommentsSchema);
module.exports = CommentsModel;