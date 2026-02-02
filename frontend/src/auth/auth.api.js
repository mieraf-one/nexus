import path from "../utils/apiEndPoints";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from "../utils/token";
import { authRequest } from "./client";

export async function loginUser(username, password) {
  try {
    const res = await authRequest.post(path.login, {
      username,
      password,
    });

    saveTokens(res.data.access, res.data.refresh, username);
  } catch (error) {
    // check the error not came from backend
    if (!error.response) {
      throw new Error("Something went wrong. please try again.");
    }

    // if backend throw the error
    if (
      error.response.data.detail.toLowerCase() ==
      "No active account found with the given credentials".toLowerCase()
    ) {
      throw new Error("Email or password is incorrect");
    }
  }
}

export async function signupUser({
  firstName,
  lastName,
  username,
  email,
  password,
  confirmPassword,
}) {
  try {
    const res = await authRequest.post(path.signup, {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
      confirm_password: confirmPassword,
    });

    return res.data;
  } catch (error) {
    if (!error.response) {
      throw new Error("something went wrong");
    }

    console.log(error.response.data);
    const signupError = new Error("ERROR");
    signupError.response = error.response.data;
    throw signupError;
  }
}

export function logoutUser() {
  clearTokens();
}

export async function refreshUser() {
  try {
    const res = await authRequest.post(path.refreshToken, {
      refresh: getRefreshToken(),
    });

    const { access } = res.data;
    saveTokens(access, getRefreshToken());
  } catch (error) {
    if (!error.response) {
      throw new Error("something went wrong.");
    }

    throw new Error(error.response.status);
  }
}
