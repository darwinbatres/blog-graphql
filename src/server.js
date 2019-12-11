const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

require("dotenv").config();

const schema = require("../graphql");

const { PORT, MONGODB_STR } = require("../config");

// when using schema, this overrides typedefs and resolvers
const server = new ApolloServer({
  schema
});

mongoose
  .connect(MONGODB_STR, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen({ port: PORT }))
  .then(options => console.log(`🚀  Server ready at ${options.url}`))
  .catch(err => {
    throw new Error(err);
  });
