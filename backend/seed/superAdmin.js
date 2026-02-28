import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env explicitly
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

import prisma from "../src/lib/prisma.js";
import { hashPassword } from "../src/utils/password.js";

async function main() {
  console.log("DB URL:", process.env.DATABASE_URL); // Debug (temporary)

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not loaded. Check .env file.");
  }

  const hash = await hashPassword("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "admin@example.com",
      password: hash,
      role: "SUPER_ADMIN",
    },
  });

  console.log("✅ Super Admin created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
