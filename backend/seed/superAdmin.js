// import pkg from "@prisma/adapter-pg";
// const { PrismaPgAdapter } = pkg;
// // OR try the direct default import if the above fails:
// // import { PrismaPgAdapter } from '@prisma/adapter-pg/dist/index.js';
// import { PrismaClient } from "@prisma/client";

// // 1. Create the Pool with explicit SSL for Render
// const connectionString = process.env.DATABASE_URL;

// const pool = new pg.Pool({
//   connectionString: connectionString,
//   ssl: {
//     rejectUnauthorized: false, // Required for Render external connections
//   },
// });

// // 2. Setup the Adapter
// const adapter = new PrismaPgAdapter(pool);
// const prisma = new PrismaClient({ adapter });

// async function main() {
//   // Your seeding logic here...
//   console.log("Connection successful!");
// }

// main();
