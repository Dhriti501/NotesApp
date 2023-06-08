import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createUserWithEmailAndPassword, getAuth, signInWithRedirect } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import db from '../firebase';
import { addDoc, collection, serverTimestamp} from 'firebase/firestore';

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  //firestore db config
  const handleLogin = (event) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let pass = data.get("password");

    const auth = getAuth();

    const newData = {
      title : "Lets Get Started!",
      details : "Find yourself forgetting to note down important things all the time? Struglling with deadlines? Use this notes app to always stay up tp date with all your work, with varied categories and interactive UI!",
      category : 'todo',
      createdAt : serverTimestamp(),
    };

    if(email && pass){
      //signed in
      createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        
        //persisting email to local storage - CREATE SESSION        
        localStorage.setItem('userEmail', userCredential.user.email);
        var value = localStorage.getItem('userEmail');
        console.log("email persisted to local storage :", value);

        //creating a new collection for new signed in user 
        const colRef = collection(db, userCredential.user.email);
        addDoc(colRef,newData)
        .then(() => {
          console.log('Data successfully written to Firestore!');
        })
        .catch((error) => {
          console.error('Error writing data to Firestore: ', error);
        });
      })
      .then(()=>{
        navigate('/')
      })
      .catch((error) => {
        console.log(error.message)

        if(error.message === "Firebase: Error (auth/email-already-in-use)."){
          alert("This email is already registered. Please login instead.")
        }
      });
    }else{
      alert("Please enter valid details!!!!")
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "green" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Log in instead"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
