import express from "express";
import { Router } from "express";
import { validationResult, matchedData, query } from "express-validator";
import { configDotenv } from "dotenv";
configDotenv("../.env");
const currencyRoute = Router();
currencyRoute.use(express.json());

const baseUrl = process.env.CURRENCY_API_URL;
const KEY = process.env.CURRENCY_API_KEY;

async function getCurrencyRate(rateType) {
  const response = await fetch(`${baseUrl}/${rateType}?apikey=${KEY}`, {
    method: "GET",
  });

  const data = await response.json();
  return data;
}

currencyRoute.get("/api/currency/latest", async (req, res) => {
  const latestRate = await getCurrencyRate("/latest");
  res.status(200).json({ success: true, latestRate });
});

currencyRoute.get("/api/currency/rate", async (req, res) => {
  const { base, target } = req.query;

  if (!base || !target) {
    res.status(400).json({ error: "base and target are required" });
  } else {
    try {
      const response = await getCurrencyRate("/latest");
      const data = response.data;
      const baseRate = data[base].value;
      const targetRate = data[target].value;

      res.status(200).json({
        success: true,
        data: { base: baseRate, target: targetRate },
      });
    } catch (err) {
      console.log(err);
    }
  }
});
currencyRoute.get("/api/currency/convert", async (req, res) => {
  const { base, target, amount } = req.query;

  if (!base || !target || !amount) {
    res.status(400).json({ error: "base, target, and amount are required" });
    return;
  } else {
    try {
      const response = await getCurrencyRate("/latest");
      const data = response.data;
      const baseRate = data[base].value;
      const targetRate = data[target].value;

      const RATE = (amount / baseRate) * targetRate;

      res.status(200).json({ success: true, data: { convertedValue: RATE } });
    } catch (err) {
      console.log(err);
    }
  }
});

export default currencyRoute;
