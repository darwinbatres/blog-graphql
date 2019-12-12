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
      getPosts: [Post!]
      getPost(postId: ID!): Post
    }
    type Mutation {
      createPost(body: String!, username: String!): Post!
      deletePost(postId: String): String!
    }
  `,
  resolvers: {
    Query: {
      async getPosts() {
        try {
          const posts = await Post.find();

          const newPosts = posts.map(post => ({
            id: post.id,
            body: post.body,
            username: post.username,
            createdAt: post.createdAt
          }));

          return newPosts;
        } catch (err) {
          throw new Error(err);
        }
      }
    },
    Mutation: {
      async createPost(_, { body, username }) {
        const newPost = await Post({
          body,
          username,
          createdAt: new Date().toISOString()
        }).save();
        return {
          body: newPost.body,
          id: newPost.id,
          username: newPost.username,
          createdAt: newPost.createdAt
        };
      }
    }
  }
};
