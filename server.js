import express from "express";
import cors from "cors";
import currencyRoute from "./routes/currencies.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(currencyRoute);

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
});
