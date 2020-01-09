var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    }

});
var TaskModel = mongoose.model('task', TaskSchema);
module.exports = TaskModel;
