const mongoose = require('mongoose');


const Schema = mongoose.Schema;
var User = mongoose.model('User');

const QuestionSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    downvotes:{
        type: Number,
        default: 0,
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Comment'
    }],
},{timestamps:true});


QuestionSchema.methods.toJSONFor = function(){
    return {
      _id:this._id,
      body: this.body,
      createdAt: this.createdAt,
      upvotes: this.upvotes,
      downvotes:this.downvotes,
      author: this.author.toProfileJSONFor(this.author),
      comments:this.comments.map((comment) => {
        return comment.toJSONFor();
    }),
    };
};
QuestionSchema.methods.toJSONForList = function(user){
    return {
      _id:this._id,
      body: this.body,
      createdAt: this.createdAt,
      upvotes: this.upvotes,
      downvotes:this.downvotes,
      author: this.author.toProfileJSONFor(this.author),
    };
};

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;