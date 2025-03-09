import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../db";

const router = Router();

router.get(
  "/confessions",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
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
      console.error(err);
    }
  })
);

router.post(
  "/confessions",
  async (req: Request, res: Response): Promise<void> => {
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
      console.error(err);
    }
  }
);

router.post(
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

router.post(
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

export default router;
