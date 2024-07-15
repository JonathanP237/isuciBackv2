import pg from 'pg';
import { config } from 'dotenv';

config();

class DBPool {
  static instance = null;

  constructor() {
    if (!DBPool.instance) {
      DBPool.instance = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
      });
    }
    return DBPool.instance;
  }
}

export default DBPool;