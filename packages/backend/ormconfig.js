const config = {
  entities: ['src/models/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],

  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/subscriber',
  },
};

module.exports = [
  {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,

    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,

    ...config,
  },
  {
    name: 'test-connection',

    type: 'postgres',
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,

    database: process.env.TEST_DB_NAME,
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASS,

    ...config,
  },
];
