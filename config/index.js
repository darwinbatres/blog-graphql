module.exports = {
  MONGODB_STR: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0-4zz9m.mongodb.net/${process.env.DB_NAME}`,
  PORT: process.env.PORT || 5001
};
