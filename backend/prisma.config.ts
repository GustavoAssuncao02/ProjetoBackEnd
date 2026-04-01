import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config({ override: true });

console.log("DATABASE_URL =", process.env.DATABASE_URL);

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    url: process.env.DATABASE_URL!,
  },
});