import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Notes from "./components/Notes";
import Create from "./components/Create";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from "./cardComponent/Layout";


const myTheme = createTheme({
  palette: {
    primary : {
      main : "#91D8E4"
    },
    secondary : {
      main : "#EB455F"
    }
  },
  typography :{
    fontFamily : "Quicksand",
  },
  // textField :{
  //   margin: {
  //     dense : "50px"
  //   }
  // },
  listItemText : {
    fontSize:'2em',
  }
})

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Notes/>}/>
            <Route path="/create" element={<Create/>}/>
          </Routes> 
        </Layout>
      </Router>
    </ThemeProvider>
      
    
  );
}

export default App;
