import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material";
import AppProvider from "./contexts/AppContext";
import Navbar from "./components/ui/Navbar";
import Drawer from "./components/ui/MenuDrawer";
import Main from "./components/Main";
import { CssBaseline, Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./theme";

const defaultTheme = createTheme(theme);

const queryClient = new QueryClient();

function App() {
  return (
    <AppProvider>
      <ThemeProvider theme={defaultTheme}>
        <QueryClientProvider client={queryClient}>
          <Box sx={{ display: "flex", flexGrow: 1, width: "100vw" }}>
            <CssBaseline />
            <Navbar />
            <Drawer />
            <Main />
          </Box>
        </QueryClientProvider>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
