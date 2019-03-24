var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
    body: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    downvotes: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

CommentSchema.methods.toJSONFor = function (user) {
    return {
        _id: this._id,
        body: this.body,
        createdAt: this.createdAt,
        upvotes: this.upvotes,
        downvotes: this.downvotes,
        author: this.author.toProfileJSONFor(this.author)
    };
};

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;