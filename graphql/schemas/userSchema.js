const { gql } = require("apollo-server");

const User = require("../../models/User");

module.exports = {
  typeDefs: gql`
    type User {
      id: ID!
      username: String!
    }
    type Query {
      getUsers: [User]
    }
  `,
  resolvers: {
    Query: {
      async getUsers() {
        try {
          const users = await User.find();
          return users;
        } catch (err) {
          throw new Error(err);
        }
      }
    }
  }
};
