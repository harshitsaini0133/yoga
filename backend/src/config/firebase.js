import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const serviceAccountPath = path.resolve("./src/config/serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
