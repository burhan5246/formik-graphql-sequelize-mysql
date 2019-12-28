const { gql } = require("apollo-server-express");
module.exports = gql`
  type User {
    id: ID
    name: String
    email: String
    phone: String
    address: String
    zipcode: String
    profile: customObject
    document: customObject
    created_at: Date
    updated_at: Date
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  extend type Mutation {
    addUser(
      name: String
      email: String
      phone: String
      address: String
      zipcode: String
      profile: Upload
      document: Upload
    ): User
    updateUser(
      id: ID!
      name: String
      email: String
      phone: String
      address: String
      zipcode: String
      profile: Upload
      document: Upload
    ): User
    deleteUser(id: ID!): User
  }
`;
