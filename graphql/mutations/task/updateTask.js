var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var taskType = require('../../types/taskType');
var taskModel = require('../../../models/task');

exports.update = {
    type: taskType.taskType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        description: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve: async(root, args) =>{
        const UpdatedTask = await taskModel.findByIdAndUpdate(args.id,args);
        if (!UpdatedTask) {
            throw new Error('Error');
        }
        return UpdatedTask;
    }
};
