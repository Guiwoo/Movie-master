import Routers from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { dark, light } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark(!isDark);
  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <button onClick={toggleDark}>Mode</button>
      <GlobalStyle />
      <Routers />
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
}

export default App;
