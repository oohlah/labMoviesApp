import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";


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
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");


 const handleLogin = (e: React.FormEvent) => {
   e.preventDefault();


  
   console.log("Logging in with:", username, password);
  
   // redirect to home page on login
   navigate("/");
 };


 return (
   <Box sx={styles.root}>
     <Paper sx={styles.paper} elevation={3}>
       <Typography variant="h4" align="center" gutterBottom>
         Login
       </Typography>
       <Typography variant="body1" align="center" color="textSecondary">
         Sign in to access premium features
       </Typography>
       <form style={styles.form} onSubmit={handleLogin}>
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
           Sign In
         </Button>
       </form>
     </Paper>
   </Box>
 );
};


export default LoginPage;
