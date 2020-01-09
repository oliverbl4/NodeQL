var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var taskType = require('../../types/taskType');
var taskModel = require('../../../models/task');

exports.remove = {
    type: taskType.taskType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async(root, args)=> {
        const removedTask = await taskModel.findByIdAndRemove(args.id);
        if (!removedTask) {
            throw new Error('error');
        }
        return removedTask;
    }
};
