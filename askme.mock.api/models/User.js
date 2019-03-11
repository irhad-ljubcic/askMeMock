const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    questions: [{ 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Question'
    }],
},{timestamps:true});

UserSchema.methods.toProfileJSONFor = function(user){
    return {
      name: this.name,
      email: this.email
    };
  };

const User = mongoose.model('User', UserSchema);

module.exports = User;