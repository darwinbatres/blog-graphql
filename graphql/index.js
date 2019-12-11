/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const path = require("path");
const fs = require("fs");
const { makeExecutableSchema, mergeSchemas } = require("graphql-tools");

const schemas = [];

// joining path of directory
const directoryPath = path.join(__dirname, "schemas");

// get list of all files
const files = fs.readdirSync(directoryPath);

// dynamically import all schema files
const filesContent = files.map(currentFile =>
  require(`${directoryPath}/${currentFile}`)
);

// make all dynamic files executable
filesContent.forEach(currentObj => {
  const currentSchema = makeExecutableSchema({
    ...currentObj
  });

  schemas.push(currentSchema);
});

// merge all converted schemas
const schema = mergeSchemas({
  schemas
});

module.exports = schema;
