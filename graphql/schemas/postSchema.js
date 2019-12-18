const { gql } = require("apollo-server");

const Post = require("../../models/Post");

const checkAuth = require("../../utils/checkAuth");

// import/require Types from other schema(s)
const { CommentType } = require("./commentSchema");

const comments = [
  { Id: 1, comment: "Comment 1" },
  { Id: 2, comment: "Comment 2" }
];

module.exports = {
  schema: {
    typeDefs: gql`
      # "use/import/add" the above imported comment type
      ${CommentType}
      type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        # make use of the type imported from Comment schema
        comments: [Comment]
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

            return newPosts.map(post => ({ ...post, comments: [...comments] }));
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
            createdAt: newPost.createdAt,
            comments: [...comments]
          };
        }
      }
    }
  }
};
