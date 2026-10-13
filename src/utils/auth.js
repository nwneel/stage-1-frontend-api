import { headers, handleServerResponse } from "./api.js";
import { baseUrl } from "./constants.js";

export const signUp = ({ username, email, password, confirmPassword }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
    }),
  }).then(handleServerResponse);
};

export const signIn = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(handleServerResponse);
};

export const forgetPassword = ({ email }) => {
  return fetch(`${baseUrl}/forget-password`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
    }),
  }).then(handleServerResponse);
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const APIkey = "fa881e78e1814a528eb5b8d3048708e5";
