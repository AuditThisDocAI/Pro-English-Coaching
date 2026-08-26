import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.ts';

// Add global connection pool caching to persist across hot-reloads
declare global {
  var _postgresPool: Pool | undefined;
}

let drizzleInstance: ReturnType<typeof drizzle> | null = null;

// Function to create or retrieve the connection pool.
export const createPool = (): Pool | null => {
  if (!process.env.SQL_HOST) {
    return null;
  }
  if (!global._postgresPool) {
    try {
      global._postgresPool = new Pool({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DB_NAME,
        max: 10,
        connectionTimeoutMillis: 15000,
        idleTimeoutMillis: 30000,
      });

      // Prevent unhandled pool-level errors from crashing the application
      global._postgresPool.on('error', (err) => {
        console.warn('SQL pool client notice:', err?.message || err);
      });
    } catch (err) {
      console.warn('Could not initialize SQL connection pool:', err);
      return null;
    }
  }
  return global._postgresPool;
};

export const getDb = () => {
  if (drizzleInstance) return drizzleInstance;
  const pool = createPool();
  if (pool) {
    drizzleInstance = drizzle(pool, { schema });
    return drizzleInstance;
  }
  return null;
};

// Safe proxy for db export to prevent startup crashes when SQL environment variables are omitted
export const db = new Proxy({} as any, {
  get(_target, prop) {
    const instance = getDb();
    if (!instance) {
      throw new Error('Database is not configured or SQL_HOST is missing.');
    }
    return (instance as any)[prop];
  },
});

