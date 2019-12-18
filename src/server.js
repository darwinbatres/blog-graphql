const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { mergeAllSchemas } = require("merge-gql-schemas");

require("dotenv").config();

const schema = mergeAllSchemas("../graphql/schemas");

const { PORT, MONGODB_STR } = require("../config");

// when using schema, this overrides typedefs and resolvers
const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req })
});

mongoose
  .connect(MONGODB_STR, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen({ port: PORT }))
  .then(options => console.log(`🚀  Server ready at ${options.url}`))
  .catch(err => {
    throw new Error(err);
  });
