import { createMuiTheme } from "@material-ui/core/styles";
import { amber, blue } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    background: {
      default: "#E1E2E1",
      paper: "#F5F5F6",
    },
    primary: amber,
    secondary: blue,
    contrastThreshold: 4,
  },
  typography: {
    useNextVariants: true,
  },
});
