import { createConnection, getConnectionOptions, Connection } from 'typeorm';

async function createDefaultConnection(
  optionName = 'default',
): Promise<Connection> {
  const defaultOptions = await getConnectionOptions(optionName);

  return createConnection({
    ...defaultOptions,
    name: 'default',
  });
}

export default createDefaultConnection;
