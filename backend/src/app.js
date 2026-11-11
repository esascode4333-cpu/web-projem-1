import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js"; // İleride açacağız

const app = express();
app.use(cors());
app.use(express.json()); // body - req.body

// HEALTH-CHECK ENDPOINT'İ
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2311012055" // Öğrenci numaran
  });
});

app.use("/events", eventRoutes); // İleride açacağız

app.use((req, res) => { // eşleşme yoksa
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;