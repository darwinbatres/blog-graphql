# Blog-Graphql

Simple backend for a blog application using graphql

### Stack

- graphql
- apollo-server
- mongodb
- mongoose
- prettier
- eslint
- for a more detailed list, check `package.json`

#### Features

1 Implemented a way to import/add schemas dynamically, make sure to keep all schemas inside one same folder, similar to `graphql/schemas` and that you estructure your exports just like in the examples provided.

1. Note that we can also share Types accross different schemas, check the following schemas: `comment and post`

1. Added [new library](https://www.npmjs.com/package/merge-models) to automatically import all models and have them passed using context to ApolloServer, check an example from resolvers found in `graphql/schemas/*`

## Installation

- `git clone` this repo
- `npm install` all dependencies
- `make sure you configure` `.env` properties before launching it

### .Env

- Create or configure your environment variables, take a look at file `.env.example`
