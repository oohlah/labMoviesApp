import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import supabase from "../lib/supbase";
import useAuthLocation from "../hooks/useAuthLocation";

const styles = {
 root: {
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   marginTop: 8,
 },
 paper: {
   padding: 4,
   display: "flex",
   flexDirection: "column",
   width: "100%",
   maxWidth: 400,
 },
 form: {
   width: "100%",
   marginTop: 2,
 },
 submit: {
   marginTop: 3,
   marginBottom: 2,
 },
};


const LoginPage: React.FC = () => {
 const navigate = useNavigate();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [message, setMessage] = useState("");

const { from, location } = useAuthLocation();

 console.log("LOCATION: ", location);
console.log("LOCATION STATE: ", location.state); // should log link to previous page




 const handleLogin = async (e: React.FormEvent) => {
   e.preventDefault();

const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    
   });

    if(error){
    console.log(error.status); // get status code
    setMessage(error.message);
    return;
   }

   

   if(data.session){
    setMessage(`User logged in with email: ${email}`);
    console.log("NAVIGATING TO:", from);
     // redirect to home page on login
    // SHOULD NAV TO PREV LOCATION - oe homepage if no state.location
      if (from) {
     navigate(from.pathname, {
      state: from.state,
     });   // fix - include state, losing id from review form
   }else{
    navigate("/");
    setMessage("Log in Failed");
   }
}
  

 };


 return (
   <Box sx={styles.root}>
     <Paper sx={styles.paper} elevation={3}>
       <Typography variant="h4" align="center" gutterBottom>
         Login
       </Typography>
       <Typography variant="body1" align="center" color="textSecondary">
         Log in to access premium features
       </Typography>
       <form style={styles.form} onSubmit={handleLogin}>
         <TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           label="Email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           autoFocus
         />
         <TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           label="Password"
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
         />
         <Button
           type="submit"
           fullWidth
           variant="contained"
           color="primary"
           sx={styles.submit}
         >
           Log In
         </Button>
         {message && (
       <Typography color="error" sx={{ mt: 2 }}>
         {message}
       </Typography>
         )}
        <>
        <span>Don't already have an account? </span>
        {/* //use state is state exists */}
        <Link to="/signupPage" state={location.state} replace >Sign Up</Link> 
        </>
       </form>
     </Paper>
   </Box>
 );
};


export default LoginPage;
