const config = {
  datasources: {
    db: {
      // Prisma Migrate (Prisma v7) reads the connection URL from here.
      // Ensure you have DATABASE_URL set in your environment or .env file.
      url: process.env.DATABASE_URL,
    },
  },
};

export default config;
