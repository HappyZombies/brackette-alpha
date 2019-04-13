import axios from "axios";
import store from "store";
import { TOKEN } from "./Constants";

export const authAxios = axios.create({
  headers: {
    Authorization: {
      toString() {
        return `Bearer: ${store.get(TOKEN)}`;
      }
    }
  }
});
