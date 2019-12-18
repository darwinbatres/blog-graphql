const { gql } = require("apollo-server");

// define the type(s) you need to export
const CommentType = `
  type Comment {
    Id: ID!
    comment: String!
  }
`;

module.exports = {
  schema: {
    typeDefs: gql`
      # use the above defined type for comment
      ${CommentType}
      type Query {
        # make use of the type safely
        getComments: [Comment]!
      }
    `,
    resolvers: {
      Query: {
        getComments() {
          return [{ Id: "123", comment: "some comment" }];
        }
      }
    }
  },
  // export types you intent to reuse in other schemas
  CommentType
};
