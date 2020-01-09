var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var taskType = require('../../types/taskType');
var taskModel = require('../../../models/task');

exports.add = {
    type: taskType.taskType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        description: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve: async(root, args)=> {
        const uModel = new taskModel(args);
        const newTask = await uModel.save();
        if (!newTask) {
            throw new Error('error');
        }
        return newTask;
    }
};
