import { Theme, ThemeOptions } from "@mui/material";

const primary = "#26BAD4";

export default {
  typography: {
    h4: {
      fontSize: "34px",
      lineHeight: "42px",
    },
    h5: {
      fontSize: "24px",
      lineHeight: "32px",
    },
    fontFamily: [
      "Monserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
    ].join(","),
  },
  palette: {
    primary: { main: primary },
    secondary: { main: "#FFF" },
    background: { paper: "#333333", default: "#FFF" },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        option: {
          backgroundColor: "white",
        },
        select: {
          backgroundColor: "white",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { backgroundColor: "white" },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: { backgroundColor: "white" },
        paper: { backgroundColor: "white" },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: "white",
          border: "Opx solid black",
        },
       
      },
    },
    MuiInput: {
      styleOverrides: { root: { color: "white" } },
    },
    MuiChip: { styleOverrides: { root: { height: "20px" } } },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& input::placeholder": {
            color: "white",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: primary,
          color: "white",
          "&:hover": {
            backgroundColor: "#125699",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: (themeParam: Theme) => `
        h5{
          font-size:24px;
          line-height:32px;
        }  
          h6 {
            color: ${themeParam.palette.secondary};
            font-weight:500;
            line-height:32px;
            size:20px;
          }
        `,
    },
  },
} as ThemeOptions;
