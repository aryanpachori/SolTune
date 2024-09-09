import { Router } from "express";
import { middleware } from "./middleware";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();
router.post("/create", middleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  console.log(userId);
  const { name, amount } = req.body;

 
  if (!name || !amount) {
    return res.status(400).json({ message: "Invalid inputs" });
  }

  try {
    const newSpace = await prisma.space.create({
      data: {
        creatorId: userId,
        amount: amount,
        name: name,
      },
    });
    const joinLink = `http://localhost:3001/spaces/${newSpace.id}`;

    res.status(201).json({ space: newSpace, joinLink });
  } catch (e) {
    console.error("Error creating space:", e);
    res.status(500).json({ message: "Error creating space" });
  }
});

export default router;
