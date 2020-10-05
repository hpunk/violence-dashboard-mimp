import { createMuiTheme } from "@material-ui/core/styles";
export const theme = createMuiTheme({
    typography: {
        fontSize: 12,
    },
    palette: {
        primary: { light: "#6af2ff", main: "#00bfff", dark: "#008fcc", contrastText: "#ffffff" },
        secondary: { light: "#69afff", main: "#0080FF", dark: "#0055cb", contrastText: "#ffffff" },
        white: { light: "#ffffff", main: "#ffffff", dark: "#ffffff", contrastText: "#000000" },
    },
    overrides: {
        MuiFormLabel: {
            root: {
                fontSize: "14px",
                fontWeight: "lighter",
                color: "#00bfff",
                "&:hover": {
                    color: "#00bfff"
                },
            },
            focused: {
                "&:hover": {
                    color: "#00bfff"
                }
            },
            formControl: {
                marginTop: "50px"
            }
        },
    }
});
