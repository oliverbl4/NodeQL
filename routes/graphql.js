// import graphql-express and TaskSchema
var express = require('express');
var router = express.Router();
var graphqlExpress = require("express-graphql");
var schemas = require('../graphql/Schema').schemas;

//add the schema to graphql-express
router.use('/', graphqlExpress({
    schema: schemas,
    rootValue: global,
    graphiql: true
}));

module.exports = router;
