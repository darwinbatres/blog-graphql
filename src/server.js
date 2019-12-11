const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

require("dotenv").config();

const typeDefs = require("../graphql/typeDefs");
const userTypeDefs = require("../graphql/userTypeDefs");

const resolvers = require("../graphql/resolvers");

const { PORT, MONGODB_STR } = require("../config");

const server = new ApolloServer({
  typeDefs: [typeDefs, userTypeDefs],
  resolvers
});

mongoose
  .connect(MONGODB_STR, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen({ port: PORT }))
  .then(options => console.log(`🚀  Server ready at ${options.url}`))
  .catch(err => {
    throw new Error(err);
  });
