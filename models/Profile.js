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
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
    }
  ],
  following: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
    }
  ],
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
      },
      caption: {
        type: String
      },
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);