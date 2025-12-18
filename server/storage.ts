import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

/* =======================
   SAVE DATA TYPE
======================= */
export type SaveData = {
  id: string;
  payload: any;
  createdAt: Date;
};

/* =======================
   STORAGE INTERFACE
======================= */
export interface IStorage {
  // USER
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // SAVE DATA
  saveData(data: any): Promise<SaveData>;
  getAllSavedData(): Promise<SaveData[]>;
}

/* =======================
   MEMORY STORAGE
======================= */
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private savedData: SaveData[];

  constructor() {
    this.users = new Map();
    this.savedData = [];
  }

  // ===== USER =====
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // ===== SAVE DATA =====
  async saveData(data: any): Promise<SaveData> {
    const item: SaveData = {
      id: randomUUID(),
      payload: data,
      createdAt: new Date(),
    };

    this.savedData.push(item);
    return item;
  }

  async getAllSavedData(): Promise<SaveData[]> {
    return this.savedData;
  }
}

/* =======================
   EXPORT INSTANCE
======================= */
export const storage = new MemStorage();

