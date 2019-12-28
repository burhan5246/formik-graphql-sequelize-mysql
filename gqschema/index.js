const { gql } = require("apollo-server-express");
const userSchema = require("./user");

const linkSchema = gql`
  scalar Date
  scalar customArray
  scalar customObject

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [linkSchema, userSchema];
