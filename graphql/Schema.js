var GraphQLSchema = require('graphql').GraphQLSchema;
var graphqlTools = require('graphql-tools');
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var taskType = require('./queries/taskQuery').TaskQuery;
var GraphQLList = require('graphql').GraphQLList;
var taskMutation = require('./mutations/task/taskMutation');

var taskSchema = new GraphQLSchema({
    query: taskType,
    mutation: new GraphQLObjectType({
        name: 'TaskMutation',
        fields: taskMutation
    })
});

exports.schemas = graphqlTools.mergeSchemas({
    schemas: [
        taskSchema
    ]
});
