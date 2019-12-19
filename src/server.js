const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { mergeAllSchemas } = require("merge-gql-schemas");
const { mergeModels } = require("merge-models");

require("dotenv").config();

const schema = mergeAllSchemas("../graphql/schemas");
const models = mergeModels({ pathToModels: "../models" });

const { PORT, MONGODB_STR } = require("../config");

// when using schema, this overrides typedefs and resolvers
const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req, models })
});

mongoose
  .connect(MONGODB_STR, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen({ port: PORT }))
  .then(options => console.log(`🚀  Server ready at ${options.url}`))
  .catch(err => {
    throw new Error(err);
  });
