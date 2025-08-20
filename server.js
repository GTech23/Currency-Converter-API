import express from "express";
import currencyRoute from "./routes/currencies.js";

const app = express();
const PORT = 3000;

app.use(currencyRoute);

app.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
});
