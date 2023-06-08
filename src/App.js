
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from "./components/Notes";
import Create from "./components/Create";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./cardComponent/Layout";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";


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

  //track authetication status at all times
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed IN:', auth.currentUser.email);
      } else {
        console.log('user is signed OUT');
      }
    });
    // Clean up the event listener
    return () => unsubscribe();
  }, []);


  return (
    <ThemeProvider theme={myTheme}>
      <Router>
          <Routes>
            <Route path="/" element={<Layout><Notes/></Layout>} />
            <Route path="/create" element={<Layout><Create /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>

      </Router>
    </ThemeProvider>
  );
}

export default App;
