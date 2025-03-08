import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.get(
  "/confessions",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { sort = "new", page = 1 } = req.query;
    const skip = (Number(page) - 1) * 20;

    try {
      const confessions = await prisma.confession.findMany({
        skip,
        take: 20,
        orderBy: sort === "new" ? { createdAt: "desc" } : { upVote: "desc" },
      });
      res.json(confessions);
    } catch (err) {
      next(err);
    }
  }
);

app.post(
  "/confessions",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { text, tags } = req.body;
    if (!text || text.length > 140) {
      res.status(400).json({ error: "Invalid confession" });
      return;
    }

    try {
      const confession = await prisma.confession.create({
        data: { text, tags: tags || [] },
      });
      res.json(confession);
    } catch (err) {
      next(err);
    }
  }
);

app.post(
  "/confessions/:id/upvote",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const confession = await prisma.confession.update({
        where: { id: Number(req.params.id) },
        data: { upVote: { increment: 1 } },
      });
      res.json(confession);
    } catch (err) {
      console.error(err);
    }
  }
);
app.post(
  "/confessions/:id/downvote",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const confession = await prisma.confession.update({
        where: { id: Number(req.params.id) },
        data: { downVote: { decrement: 1 } },
      });
      res.json(confession);
    } catch (err) {
      console.error(err);
    }
  }
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
