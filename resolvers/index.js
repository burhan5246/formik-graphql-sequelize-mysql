const { GraphQLDateTime } = require("graphql-iso-date");
const userResolvers = require("./user");

const customScalarResolver = {
  Date: GraphQLDateTime
};

const customArray = {
  customArray: []
};

const customObject = {
  customObject: {}
};

module.exports = [
  customScalarResolver,
  customArray,
  customObject,
  userResolvers
];
