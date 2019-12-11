const { gql } = require("apollo-server");

const Post = require("../../models/Post");

module.exports = {
  typeDefs: gql`
    type Post {
      id: ID!
      body: String!
      createdAt: String!
      username: String!
    }
    type Query {
      getPosts: [Post]
    }
  `,
  resolvers: {
    Query: {
      async getPosts() {
        try {
          const posts = await Post.find();
          return posts;
        } catch (err) {
          throw new Error(err);
        }
      }
    }
  }
};
