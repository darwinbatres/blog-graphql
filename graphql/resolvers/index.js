const postsResolvers = require("./postResolvers");

module.exports = {
  Query: {
    ...postsResolvers.Query
  }
};
