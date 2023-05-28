// json-server --watch data/db.json --port 8000

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from "./components/Notes";
import Create from "./components/Create";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./cardComponent/Layout";
import Login from "./pages/login";
import SignUp from "./pages/signup";

const myTheme = createTheme({
  palette: {
    primary: {
      main: "#91D8E4",
    },
    secondary: {
      main: "#EB455F",
    },
  },
  typography: {
    fontFamily: "Quicksand",
  },
  listItemText: {
    fontSize: "2em",
  },
});

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
