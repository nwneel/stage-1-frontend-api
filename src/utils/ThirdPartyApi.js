import * as countryCodes from "country-codes-list";

// API key: fa881e78e1814a528eb5b8d3048708e5
// API secret: b3ddee6f8a97401e9132ce3fd0fab1f1

let shippingCost = new Headers();
shippingCost.append("Host", "ssapi.shipstation.com");
shippingCost.append("Authorization", "fa881e78e1814a528eb5b8d3048708e5");
shippingCost.append("Content-Type", "application/json");

export const getShippingRates = ({
  city,
  state,
  zipCode,
  country,
  cartItems,
}) => {
  const carrierCodes = ["fedex_walleted", "ups_walleted", "stamps_com"];
  const country_code =
    countryCodes.findOne("countryNameEn", country)?.countryCode ||
    (country === "United States" ? "US" : undefined);
  if (!country_code) {
    throw new Error(`Could not find a country code for "${country}".`);
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new Error("Cannot calculate shipping without cart items.");
  }

  const packageDetails = cartItems.reduce(
    (packageTotals, item) => {
      const quantity = Number(item.quantity);
      const weightOz = Number(item.weight?.ounces);
      const { length, width, height } = item.dimensions || {};
      const dimensions = [length, width, height].map(Number);

      if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        !Number.isFinite(weightOz) ||
        weightOz <= 0 ||
        dimensions.some((dimension) => !Number.isFinite(dimension) || dimension <= 0)
      ) {
        throw new Error(
          `Shipping weight or dimensions are missing or invalid for "${item.name || item._id}".`,
        );
      }

      return {
        weightOz: packageTotals.weightOz + weightOz * quantity,
        length: Math.max(packageTotals.length, dimensions[0]),
        width: Math.max(packageTotals.width, dimensions[1]),
        height: packageTotals.height + dimensions[2] * quantity,
      };
    },
    { weightOz: 0, length: 0, width: 0, height: 0 },
  );

  const username = "fa881e78e1814a528eb5b8d3048708e5";
  const password = "b3ddee6f8a97401e9132ce3fd0fab1f1";
  const credentials = btoa(`${username}:${password}`);

  return Promise.all(
    carrierCodes.map(async (carrierCode) => {
      const response = await fetch(
        "https://ssapi.shipstation.com/shipments/getrates",
        {
          method: "POST",
          headers: {
            Host: "ssapi.shipstation.com",
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            carrierCode,
            serviceCode: null,
            packageCode: null,
            fromPostalCode: 92503,
            toState: state && state.length === 2 ? state : undefined,
            toCountry: country_code,
            toPostalCode: zipCode,
            toCity: city,
            weight: { value: packageDetails.weightOz, units: "ounces" },
            dimensions: {
              units: "inches",
              length: packageDetails.length,
              width: packageDetails.width,
              height: packageDetails.height,
            },
            confirmation: "delivery",
            residential: false,
          }),
          redirect: "follow",
        },
      );
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(
          `${carrierCode}: ${
            (data && (data.ExceptionMessage || data.Message)) ||
            `ShipStation request failed (${response.status})`
          }`,
        );
      }

      return Array.isArray(data)
        ? data.map((rate, index) => ({
            ...rate,
            carrierCode,
            rateId: `${carrierCode}:${rate.serviceCode}:${rate.packageCode || ""}:${index}`,
          }))
        : [];
    }),
  ).then((ratesByCarrier) => ratesByCarrier.flat());
};
