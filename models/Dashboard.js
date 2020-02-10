const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    users: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          },
          text: {
            type: String,
            required: true
          },
          name: {
            type: String
          },
          avatar: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          },
          posts: [
            {
              user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
              },
              text: {
                type: String,
                required: true
              },
              name: {
                type: String
              },
              avatar: {
                type: String
              },
              date: {
                type: Date,
                default: Date.now
              }
            }
          ],
        }
      ],
    date: {
      type: Date,
      default: Date.now
    }
  });

module.exports = User = mongoose.model('users', DashboardSchema);