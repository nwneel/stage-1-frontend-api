// API key: fa881e78e1814a528eb5b8d3048708e5
// API secret: b3ddee6f8a97401e9132ce3fd0fab1f1
let shippingCost = new Headers();
shippingCost.append("Host", "ssapi.shipstation.com");
shippingCost.append("Authorization", "fa881e78e1814a528eb5b8d3048708e5");
shippingCost.append("Content-Type", "application/json");

let raw = JSON.stringify({
  carrierCode: "",
  serviceCode: null,
  packageCode: null,
  fromPostalCode: "",
  toState: "",
  toCountry: "",
  toPostalCode: "",
  toCity: "",
  weight: { value: 3, units: "ounces" },
  dimensions: { units: "inches", length: 7, width: 5, height: 6 },
  confirmation: "delivery",
  residential: false,
});

let requestOptions = {
  method: "POST",
  headers: shippingCost,
  body: raw,
  redirect: "follow",
};

fetch("https://ssapi.shipstation.com/shipments/getrates", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
