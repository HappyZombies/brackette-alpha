import axios from "axios";
import store from "store";
import { TOKEN } from "./Constants";

export const authAxios = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization: {
      toString() {
        return `Bearer: ${store.get(TOKEN)}`;
      }
    }
  }
});

export const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export const intToRGB = (i: number) => {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
};
