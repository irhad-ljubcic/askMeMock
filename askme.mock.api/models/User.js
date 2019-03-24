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
    image_url:{
        type: String,
        required: false
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
      _id:user._id,
      name: user.name,
      email: user.email,
      image_url:user.image_url,
    };
  };

const User = mongoose.model('User', UserSchema);

module.exports = User;