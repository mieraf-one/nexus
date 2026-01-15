import axios from "axios";
import { BASE_URL } from "../utils/const";
import { getAccessToken } from "../utils/token";

export const authRequest = axios.create(
        {
            baseURL: BASE_URL,
        }
    );

export const request = axios.create(
        {
            baseURL: BASE_URL,
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        }
)
