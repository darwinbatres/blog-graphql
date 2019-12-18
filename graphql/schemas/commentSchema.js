const { gql } = require("apollo-server");

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
  CommentType
};
