import { PrismaClient } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";
import { Router } from "express";
import nacl from "tweetnacl";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const router = Router();
const prisma = new PrismaClient();
dotenv.config();

router.post("/signin", async (req, res) => {
  const { signature, publicKey } = req.body;
  if (!signature || !publicKey) {
    return res.status(401).json({ message: "Invalid inputs" });
  }
  const message = new TextEncoder().encode(
    "Welcome to SolTune! Connect your wallet to join the beat of music."
  );
  const result = nacl.sign.detached.verify(
    message,
    new Uint8Array(signature.data),
    new PublicKey(publicKey).toBytes()
  );
  if (!result) {
    return res.status(401).json({ message: "Invalid signature" });
  }
  const existingUser = await prisma.user.findFirst({
    where: {
      address: publicKey,
    },
  });
  if (existingUser) {
    const token = jwt.sign(
      {
        userId: existingUser.id,
      },
      process.env.JWT_SECRET!
    );
    res.json({ token });
  } else {
    const user = await prisma.user.create({
      data: {
        address: publicKey,
      },
    });
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET!
    );
    res.json({ token });
  }
});

export default router;
