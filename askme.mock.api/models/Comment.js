var mongoose = require('mongoose');

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

// Requires population of author
CommentSchema.methods.toJSONFor = function (user) {
    return {
        id: this._id,
        body: this.body,
        createdAt: this.createdAt,
        upvotes: this.upvotes,
        downvotes: this.downvotes,
        author: this.author.toProfileJSONFor(user)
    };
};

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;