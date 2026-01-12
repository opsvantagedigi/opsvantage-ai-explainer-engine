module.exports = {
  datasources: {
    db: {
      // Ensure DATABASE_URL is set in the environment
      url: process.env.DATABASE_URL,
    },
  },
};
