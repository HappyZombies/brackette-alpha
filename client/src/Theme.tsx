import { createMuiTheme } from '@material-ui/core/styles';
import { amber, teal } from "@material-ui/core/colors"

export const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: amber,
        secondary: teal,
        contrastThreshold: 4,
        text: {
            primary: "#ffffff",
            secondary: "#ffffff"
        },
    },
    typography: {
        useNextVariants: true,
    },
})

// {
//     "palette": {
//         "primary1Color": "#ffc400",
//             "primary2Color": "#ffc400",
//                 "accent1Color": "#00bfa5",
//                     "accent2Color": "#00796b",
//                         "accent3Color": "#80cbc4",
//                             "borderColor": "#00796b",
//                                 "disabledColor": "#ffffff",
//                                     "pickerHeaderColor": "#ffffff",
//                                         "clockCircleColor": "#fff59d",
//                                             "shadowColor": "rgba(255, 255, 255, 0.43)"
//     }
// }

