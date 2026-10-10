import * as countryCodes from "country-codes-list";

const CARRIER_IDS = ["se-6940683", "se-6940684", "se-6940685"];

export const getShippingRates = async ({
  fullName,
  address,
  city,
  state,
  zipCode,
  country,
  cartItems,
  excludeEnvelopes = false,
}) => {
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
        dimensions.some(
          (dimension) => !Number.isFinite(dimension) || dimension <= 0,
        )
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

  const response = await fetch("/shipstation/v2/rates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rate_options: { carrier_ids: CARRIER_IDS },
      shipment: {
        validate_address: "no_validation",
        ship_from: {
          name: "Shipping Department",
          phone: "5555555",
          address_line1: "1 Main Street",
          city_locality: "Riverside",
          state_province: "CA",
          postal_code: "92503",
          country_code: "US",
        },
        ship_to: {
          name: fullName || "Customer",
          phone: "",
          address_line1: address || "Address",
          city_locality: city,
          state_province: state && state.length === 2 ? state : undefined,
          postal_code: zipCode,
          country_code,
        },
        packages: [
          {
            weight: { value: packageDetails.weightOz, unit: "ounce" },
            dimensions: {
              unit: "inch",
              length: packageDetails.length,
              width: packageDetails.width,
              height: packageDetails.height,
            },
          },
        ],
      },
    }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      data?.errors?.[0]?.message ||
        `ShipStation request failed (${response.status})`,
    );
  }
  // excludes shipping services
  const excludedServiceCodes = [
    "usps_media_mail",
    "usps_priority_mail",
    "ups_ground_saver",
    "ups_ground",
    "fedex_ground",
    "fedex_express_saver",
    "ups_3_day_select",
    "ups_2nd_day_air",
    "ups_2nd_day_air_am",
    "fedex_2day",
    "fedex_economy_one_rate",
    "fedex_economy",
    "fedex_2day_one_rate",
  ];
  const isEnvelope = (rate) => /envelope/i.test(rate.package_type || "");
  const isUsps = (rate) => rate.service_code.startsWith("usps");
  const rates = (data?.rate_response?.rates || []).filter(
    (rate) =>
      !excludedServiceCodes.includes(rate.service_code) &&
      !(excludeEnvelopes && isEnvelope(rate)),
  );
  const validRates = rates.filter(
    (rate) => rate.validation_status !== "invalid" && rate.shipping_amount,
  );
  if (validRates.length === 0 && rates.length > 0) {
    throw new Error(
      rates[0].error_messages?.[0] ||
        data.rate_response.errors?.[0]?.message ||
        "No valid shipping rates were returned.",
    );
  }

  const cheapestByOption = new Map();
  validRates
    .map((rate) => ({
      ...rate,
      rateId: rate.rate_id,
      serviceName: [
        rate.service_type
          .toLowerCase()
          .startsWith(rate.carrier_code.split("_")[0])
          ? rate.service_type
          : `${rate.carrier_friendly_name} ${rate.service_type}`,
        !isUsps(rate) &&
          rate.package_type &&
          `(${rate.package_type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())})`,
      ]
        .filter(Boolean)
        .join(" "),
      serviceCode: rate.service_code,
      carrierCode: rate.carrier_code,
      packageName: rate.package_type || "",
      packageCode: rate.package_type || "",
      shipmentCost: rate.shipping_amount.amount,
      otherCost:
        (rate.insurance_amount?.amount || 0) +
        (rate.confirmation_amount?.amount || 0) +
        (rate.other_amount?.amount || 0),
    }))
    .forEach((rate) => {
      const key = `${rate.carrier_id}|${rate.service_code}|${isUsps(rate) ? "" : rate.package_type || ""}`;
      const existing = cheapestByOption.get(key);
      if (
        !existing ||
        rate.shipmentCost + rate.otherCost <
          existing.shipmentCost + existing.otherCost
      ) {
        cheapestByOption.set(key, rate);
      }
    });

  return [...cheapestByOption.values()].sort(
    (a, b) =>
      a.carrier_friendly_name.localeCompare(b.carrier_friendly_name) ||
      a.shipmentCost + a.otherCost - (b.shipmentCost + b.otherCost),
  );
};
