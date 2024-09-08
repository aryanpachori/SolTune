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
  const { signature, publicKey, message } = req.body;
  if (!signature || !publicKey) {
    return res.status(401).json({ message: "Invalid inputs" });
  }
  const signatureUint8Array = Uint8Array.from(Buffer.from(signature, "base64"));
  const publicKeyUint8Array = new PublicKey(publicKey).toBytes();
  const messageUint8Array = Uint8Array.from(Buffer.from(message, "base64"));
  const result = nacl.sign.detached.verify(
    messageUint8Array,
    signatureUint8Array,
    publicKeyUint8Array
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
