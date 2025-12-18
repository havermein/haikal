import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // =====================
  // HEALTH CHECK
  // =====================
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // =====================
  // SAVE DATA
  // =====================
  app.post("/api/save", async (req, res) => {
    try {
      const saved = await storage.saveData(req.body);
      res.json({ success: true, saved });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to save data" });
    }
  });

  // =====================
  // LOAD DATA
  // =====================
  app.get("/api/save", async (_req, res) => {
    const data = await storage.getAllSavedData();
    res.json(data);
  });

  return httpServer;
}
