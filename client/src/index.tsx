import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { IntlProvider } from "react-intl";
import { addLocaleData } from "react-intl";
import locale_en from "react-intl/locale-data/en";

import messages_en from "./translations/en.json";

addLocaleData([...locale_en]);
const messages: any = {
  en: messages_en
};
let language = navigator.language.split(/[-_]/)[0];
language = messages[language] ? language : "en";

import Routes from "./Routes";
import store from "./store";
import { theme } from "./Theme";
import { CssBaseline } from "@material-ui/core";

import "./styles.css";

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <IntlProvider locale={language} messages={messages[language]}>
        <Routes />
      </IntlProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
