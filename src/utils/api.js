import { baseUrl } from "./constants";

export const headers = {
  "Content-Type": "application/json",
};

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

export const addCartItem = ({ product, quantity }, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product,
      quantity,
    }),
  }).then(handleServerResponse);
};
// Todo-Modify this so it applies to reviews on product page
export const addReviewLike = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
};

export const removeReviewLike = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
};

export const setUserInfo = (
  { username, email, password, confirmPassword },
  token,
) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
    }),
  }).then(handleServerResponse);
};

export const removeCartItem = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
};

export async function getRates(toPostalCode, toState = "CA") {
  const response = await fetch("http://localhost:3001/api/shipstation-rates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      toPostalCode,
      toState,
      toCountry: "US",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch rates");
  }

  return await response.json();
}
