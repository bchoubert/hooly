import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export type DwfDatabase =  Database<sqlite3.Database, sqlite3.Statement>;

/**
 * DatabaseManager: manage the database instance to get one instance
 */
class DatabaseManager {
  // Name of the database file
  private static readonly DATABASE_NAME: string = 'dfw.db';
  // Singleton instance of the database
  private static dbInstance: DwfDatabase | undefined;

  // Utils function to connect to the database
  static connect = async () => {
    console.log('Connecting...');
    DatabaseManager.dbInstance = await open<sqlite3.Database, sqlite3.Statement>({
      // No operation option: we want the default option to be used here
      // So by default, try to open the database in read and write rights. If DB file does not exist, create it
      filename: DatabaseManager.DATABASE_NAME,
      driver: sqlite3.Database
    });

    if (!DatabaseManager.dbInstance) {
      throw new Error('Can\'t instantiate database');
    }

    console.log('Migrating...');
    try {
      // Run all migrations on the DB each time we instantiate a new connection
      await DatabaseManager.dbInstance.migrate();
    } catch (error) {
      throw new Error(`Error migrating: ${error}`);
    }
  }

  // Utils function to use to get the DB Instance
  static getDbInstance = async (): Promise<DwfDatabase> => {
    // If we don't have a connection, create it and migrate
    if (!DatabaseManager.dbInstance) {
      await DatabaseManager.connect();

      // If we still have no DB, throw error
      if (!DatabaseManager.dbInstance) {
        throw new Error('Unabel to get a DB instance: unable to connect');
      }
    }
    // Return either the newly created connection or the already existing connection
    return DatabaseManager.dbInstance;
  }

  static close = async () => {
    // Close the connection
    await DatabaseManager.dbInstance?.close();
    // Reset the instance: at this point, if we ask for an instance, we will instantiate a new one
    DatabaseManager.dbInstance = undefined;
  }
}

export default DatabaseManager;
