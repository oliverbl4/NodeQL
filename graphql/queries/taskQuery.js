var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var taskModel = require('../../models/task');
var taskType = require('../types/taskType').taskType;

// Query
exports.TaskQuery = new GraphQLObjectType({
    name: 'Query',
    fields:  ()=> {
        return {
            tasks: {
                type: new GraphQLList(taskType),
                resolve:  async ()=> {
                    const tasks = await taskModel.find();
                    if (!tasks) {
                        throw new Error('error while fetching data');
                    }
                    return tasks;
                }
            }
        }
    }
});
