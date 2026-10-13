const express = require("express");
const router = express.Router();

const BASE = "https://ssapi.shipstation.com";

// Build "Country Name" -> "US" lookup from the built-in Intl data
const names = new Intl.DisplayNames(["en"], { type: "region" });
const countryCodes = {};
for (let a = 65; a <= 90; a++)
  for (let b = 65; b <= 90; b++) {
    const code = String.fromCharCode(a, b);
    try {
      const n = names.of(code);
      if (n && n !== code) countryCodes[n.toLowerCase()] = code;
    } catch {
      // Intl.DisplayNames throws for codes it doesn't recognize; skip them
    }
  }
Object.assign(countryCodes, {
  "united states": "US",
  "czech republic": "CZ",
  "bosnia and herzegovina": "BA",
});

router.post("/shipping-rates", async (req, res) => {
  const { SHIPSTATION_API_KEY: key, SHIPSTATION_API_SECRET: secret } =
    process.env;
  if (!key || !secret)
    return res.status(500).json({ error: "Shipping is not configured." });

  const { fromPostalCode, toPostalCode, toCountry, toCity, weightOz } =
    req.body || {};
  const countryCode =
    toCountry && toCountry.length === 2
      ? toCountry.toUpperCase()
      : countryCodes[String(toCountry || "").toLowerCase()];
  if (!fromPostalCode || !toPostalCode || !countryCode || !(weightOz > 0))
    return res
      .status(400)
      .json({ error: "Missing or invalid address/weight." });

  const headers = {
    Authorization:
      "Basic " + Buffer.from(`${key}:${secret}`).toString("base64"),
    "Content-Type": "application/json",
  };

  try {
    const cRes = await fetch(`${BASE}/carriers`, { headers });
    if (!cRes.ok) throw new Error(`Could not load carriers (${cRes.status})`);
    const carriers = await cRes.json();

    const results = await Promise.all(
      carriers.map(async (c) => {
        const r = await fetch(`${BASE}/shipments/getrates`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            carrierCode: c.code,
            fromPostalCode,
            toPostalCode,
            toCountry: countryCode,
            toCity: toCity || undefined,
            weight: { value: weightOz, units: "ounces" },
            confirmation: "none",
            residential: true,
          }),
        });
        if (!r.ok) return [];
        const list = await r.json();
        return list.map((x) => ({ ...x, carrier: c.name }));
      }),
    );

    const rates = results
      .flat()
      .sort(
        (a, b) => a.shipmentCost + a.otherCost - (b.shipmentCost + b.otherCost),
      );
    res.json({ rates });
  } catch (err) {
    console.error("ShipStation error:", err);
    res.status(502).json({ error: "Could not get shipping rates right now." });
  }
});

module.exports = router;
