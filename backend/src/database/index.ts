import { createConnection, getConnectionOptions, Connection } from 'typeorm';

async function createDefaultConnection(
  optionName = 'default',
): Promise<Connection> {
  const defaultOptions = await getConnectionOptions(optionName);

  const config = {
    ...defaultOptions,
    name: 'default',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  };

  return createConnection(config);
}

export default createDefaultConnection;
