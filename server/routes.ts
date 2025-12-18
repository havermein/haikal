export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/save", (req, res) => {
    res.json({ success: true, data: req.body });
  });

  return httpServer;
}
