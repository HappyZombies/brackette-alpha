import { applyMiddleware, createStore } from "redux";
import * as promise from "redux-promise-middleware";

// import reducers from "./reducers";

const middleware = applyMiddleware(promise.createPromise());

export default createStore(() => {}, middleware);
