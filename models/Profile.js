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
  handle: {
    type: String,
    required: true,
    max: 40
  },
  postnumber: {
    type: String
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