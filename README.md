# Blog-Graphql

Simple backend for a blog application using graphql

### Stack

- graphql
- apollo-server
- mongodb
- mongoose
- prettier (built-in in vscode)
- eslint
- for a more detailed list, check `package.json`

#### Features

- Implemented a way to import/add schemas for a given features dynamically, take a look at `index.js` inside `/graphql` folder; this way we can have all the logic for resolvers, mutations, query, etc., inside the same file

## Installation

- `git clone` this repo
- `npm install` all dependencies
- `make sure you configure` `.env` properties before launching it

### .Env

- Create or configure your environment variables, take a look at file `.env.example`
