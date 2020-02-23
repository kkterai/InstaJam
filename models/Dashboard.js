const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
    name: String,
    users: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'user'
      }
    ]
  });

module.exports = Dashboard = mongoose.model('dashboard', DashboardSchema);