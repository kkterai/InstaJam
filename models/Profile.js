const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  avatar: {
    type: String
  },
  username: {
    type: String,
    required: true,
    max: 40
  },
  followernumber: {
    type: String
  },
  followingnumber: {
    type: String
  },
  name: {
    type: String
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  posts: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      content: {
        type: Schema.Types.Mixed,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);