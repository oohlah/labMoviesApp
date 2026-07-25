import React, { useState } from "react";
import { useNavigate, Link, useLocation} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import supabase from "../lib/supbase";

const styles = {
 root: {
   display: "flex",
   flexDirection: "column" as const,
   alignItems: "center",
   marginTop: 8,
 },
 paper: {
   padding: 4,
   display: "flex",
   flexDirection: "column" as const,
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


const SignupPage: React.FC = () => {
 const navigate = useNavigate();


 const [username, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [message, setMessage] = useState("");

  const location = useLocation();

   const from = location.state?.from?.pathname || "/";

 const handleSignup = async (e: React.FormEvent) => {
   e.preventDefault();
   setMessage(""); // reset to empty string

    if (password !== confirmPassword) {
     setMessage("Passwords do not match.");
     return;
   }

   const { data, error } = await supabase.auth.signUp({

      email: email,
      password: password,
    
   });

   if(error){
    setMessage(error.message);
    return;
   }

   if(data){
    setMessage("User Account Created!");
   }

   setEmail("");
   setPassword("");


console.log("PRIOR LOCATION STATE: ", from);
 navigate(from); //go to saved location.state if exists else "/"
 }; 


 return (
   <Box sx={styles.root}>
     <Paper sx={styles.paper} elevation={3}>
       <Typography variant="h4" align="center" gutterBottom>
         Sign Up
       </Typography>


       <Typography variant="body1" align="center" color="text.secondary">
         Create an account to access premium features
       </Typography>


       <form style={styles.form} onSubmit={handleSignup}>
         <TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           label="Username"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
           autoFocus
        
         />


         <TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           label="Email"
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
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


         <TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           label="Confirm Password"
           type="password"
           value={confirmPassword}
           onChange={(e) => setConfirmPassword(e.target.value)}
         />


         <Button
           type="submit"
           fullWidth
           variant="contained"
           color="primary"
           sx={styles.submit}
         >
           Create Account
         </Button>
         {message && (
      <Typography color="error" sx={{ mt: 2 }}>
      {message}
     </Typography>
     )}
      <>
       <span>already have an account? </span>
       {/* //use state if state exists */}
       <Link to="/loginPage" state={location.state} replace >Login</Link> 
      </> 
       </form>
     </Paper>
   </Box>
 );
};


export default SignupPage;

