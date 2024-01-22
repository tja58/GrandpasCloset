// Library Imports
import axios from "axios";
import SecureLS from "secure-ls";
// Component Imports
import { FETCH_USER } from "./types";

const ls = new SecureLS({ isCompression: false });

export const login = (data) => async (dispatch) => {
  try {
    await axios.post("/api/login", data).then((res) => {
      const token = res.data;
      ls.set("token", token);
      window.location.href = "/account";
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const register = (data) => async (dispatch) => {
  try {
    await axios.post("/api/register", data).then((res) => {
      const token = res.data;
      ls.set("token", token);
      window.location.href = "/account";
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const user = () => async (dispatch) => {
  const token = ls.get("token");
  try {
    await axios
      .get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: FETCH_USER, payload: res.data });
      });
  } catch (e) {
    console.log("Error: ", e);
  }
};
