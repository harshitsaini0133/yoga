import express from "express";
const app = express();
app.listen(3002, "0.0.0.0", () => {
  console.log("Test server listening on 3002");
});
setTimeout(() => {
  console.log("Timeout reached");
}, 10000);
