import prisma from "../database/prisma.js";

export async function test(req, res) {
  const users = await prisma.users.findMany();

  res.json(users);
}