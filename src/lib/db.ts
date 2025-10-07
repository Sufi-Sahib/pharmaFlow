
import { openDB, type IDBPDatabase } from 'idb';

const DB_NAME = 'PharmaEasyDB';
const STORE_NAME = 'eventQueue';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

async function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

export async function addToQueue(event: any) {
  const db = await getDB();
  return db.add(STORE_NAME, event);
}

export async function getQueuedEvents() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function removeFromQueue(id: string) {
  const db = await getDB();
  return db.delete(STORE_NAME, id);
}

export { openDB };
