import { openDB } from 'idb';

export const DB_NAME = "QuizApp";
export const STORE_NAME = "users";
export const DB_VERSION = 1;

export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "name" });
          store.createIndex("highScore", "highScore");
          store.createIndex("attempts", "attempts",{multiEntry:true});
        }
      },
    });
  };
  
  
