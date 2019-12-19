const { gql, UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validateRegisterInput,
  validateLoginInput
} = require("../../utils/validators");

const generateToken = user =>
  // eslint-disable-next-line implicit-arrow-linebreak
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h"
    }
  );

module.exports = {
  schema: {
    typeDefs: gql`
      type Query {
        getUser: String
      }
      """
      User to be stored
      """
      type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
      }
      input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
      }
      type Mutation {
        """
        Information needed for the user to be registered
        """
        register(registerInput: RegisterInput!): User!
        """
        Information needed for a user to be able to login
        """
        login(username: String!, password: String!): User!
      }
    `,
    resolvers: {
      Query: {
        getUser() {
          return "this is a user";
        }
      },
      Mutation: {
        async register(_, args, { models }) {
          const {
            username,
            password,
            confirmPassword,
            email
          } = args.registerInput;

          // make sure all fields are valid
          const { valid, errors } = validateRegisterInput(
            username,
            email,
            password,
            confirmPassword
          );

          if (!valid) {
            throw new UserInputError("The following errors were found", {
              errors
            });
          }

          // validate user does not already exist
          const existingUser = await models.User.findOne({ username, email });

          if (existingUser) {
            throw new UserInputError("username/email is already taken", {
              errors: {
                username: "This username/email is already taken",
                email: "This username/email is already taken"
              }
            });
          }

          const hashPassword = await bcrypt.hash(password, 12);

          const newUser = new models.User({
            email,
            username,
            password: hashPassword,
            createdAt: new Date().toISOString()
          });

          const newUserCreated = await newUser.save();

          const token = generateToken(newUserCreated);

          return {
            id: newUserCreated.id,
            email: newUserCreated.email,
            token,
            username: newUserCreated.username,
            createdAt: newUserCreated.createdAt
          };
        },
        async login(_, { username, password }, context) {
          const { models } = context;
          const { errors, valid } = validateLoginInput(username, password);

          if (!valid) {
            throw new UserInputError("The following errors were found", {
              errors
            });
          }

          const user = await models.User.findOne({ username });

          if (!user) {
            errors.general = "User not found";
            throw new UserInputError("User not found", {
              errors
            });
          }

          const match = await bcrypt.compare(password, user.password);

          if (!match) {
            errors.general = "Wrong credentials";
            throw new UserInputError("Wrong credentials", {
              errors
            });
          }

          const token = generateToken(user);

          return {
            id: user.id,
            email: user.email,
            token,
            username: user.username,
            createdAt: user.createdAt
          };
        }
      }
    }
  }
};
