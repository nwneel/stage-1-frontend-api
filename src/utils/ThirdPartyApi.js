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
  length,
  width,
  height,
}) => {
  const raw = JSON.stringify({
    carrierCode: "stamps_com",
    serviceCode: null,
    packageCode: null,
    fromPostalCode: 92503,
    toState: state && state.length === 2 ? state : undefined,
    toCountry: country === "Canada" ? "CA" : "US",
    toPostalCode: zipCode,
    toCity: city,
    weight: { value: 3, units: "ounces" },
    dimensions: {
      units: "inches",
      length: length,
      width: width,
      height: height,
    },
    confirmation: "delivery",
    residential: false,
  });

  const username = "fa881e78e1814a528eb5b8d3048708e5";
  const password = "b3ddee6f8a97401e9132ce3fd0fab1f1";
  // 1. Combine and encode credentials into Base64
  const credentials = btoa(`${username}:${password}`);

  let requestOptions = {
    method: "POST",
    headers: {
      Host: "ssapi.shipstation.com",
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  return fetch(
    "https://ssapi.shipstation.com/shipments/getrates",
    requestOptions,
  )
    .then(async (response) => {
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(
          (data && (data.ExceptionMessage || data.Message)) ||
            `ShipStation request failed (${response.status})`,
        );
      }
      return Array.isArray(data) ? data : [];
    });
};
