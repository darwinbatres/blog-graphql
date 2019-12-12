const { gql } = require("apollo-server");

const Post = require("../../models/Post");

const checkAuth = require("../../utils/checkAuth");

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
      createPost(body: String!): Post!
      deletePost(postId: String): String!
    }
  `,
  resolvers: {
    Query: {
      async getPosts() {
        try {
          // return all results from latest to newest
          const posts = await Post.find().sort({ createdAt: -1 });

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
      async createPost(_, { body }, context) {
        const user = checkAuth(context);

        const newPost = await Post({
          body,
          username: user.username,
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
