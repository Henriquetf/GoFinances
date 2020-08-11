import { createConnection, getConnectionOptions, Connection } from 'typeorm';

async function createDefaultConnection(
  optionName = 'default',
): Promise<Connection> {
  const defaultOptions = await getConnectionOptions(optionName);

  const config = {
    ...defaultOptions,
    name: 'default',
  };

  return createConnection(config);
}

export default createDefaultConnection;
