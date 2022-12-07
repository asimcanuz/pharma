import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import LangProvider from "./contexts/lang";
import { ColorModeContext, useMode } from "./contexts/theme";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LangProvider>
          <CssBaseline />
          <div className="app">
            <main className="content">
              {/* TOPBAR */}
              {/* ROUTES */}
            </main>
          </div>
        </LangProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
