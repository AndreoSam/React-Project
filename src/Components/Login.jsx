import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { add_url, get_url } from "../Api/apiurl";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let Get_url = add_url + get_url;

  //Input validation
  const [formvalid, setFormvalid] = useState(null);
  const [success, setSuccess] = useState(null);
  const [emailError, setemailError] = useState();
  const [passwordError, setpasswordError] = useState();
  const [showPassword, setShowPassword] = React.useState(false);

  //validation for email and password
  const isEmail = (email) =>
    /^([a-z0-9.-]+)@([a-z]{5,12}).([a-z.]{2,20})$/i.test(email);

  let navigation = useNavigate();

  let [post, setPost] = useState({
    email: "",
    password: "",
    errors: { email: "", password: "" },
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    // console.log(`${name}: ${value}`);
    let err = post.errors;
    setPost({ ...post, [name]: value, errors: err });

    switch (name) {
      case "email":
        if (!isEmail(value)) {
          setemailError(true);
          err.email = "Email is invalid. Pleae re-enter.";
        } else {
          setemailError(false);
          err.email = "";
        }
        break;

      case "password":
        if (!value || value.length < 1) {
          setpasswordError(true);
          err.password = "Required";
        } else {
          setpasswordError(false);
          err.password = "";
        }
        break;

      default:
        console.log("");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!post.email || !post.password) {
      setFormvalid(true);
      setFormvalid("*All the above fields are mandatory!");
    } else {
      setFormvalid(false);
    }
  };

  //alert

  //password visibility
  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
      sx={{
        "& > :not(style)": { m: 1, width: "100%" },
      }}
      style={{
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "auto",
        maxWidth: "350px",
        boxShadow: "8px 8px 10px black",
        margin: "auto",
        marginTop: "50px",
        marginBottom: "50px",
        padding: "1rem",
      }}
    >
      <Typography variant="h5" fontWeight={"bolder"}>
        Login
      </Typography>
      <hr />
      <TextField
        error={emailError}
        id="standard-basic1"
        onChange={handleChange}
        variant="outlined"
        name="email"
        label="Email"
        helperText={
          post.errors.email ? "*Email is invalid. Pleae re-enter." : ""
        }
        required
      />
      <TextField
        error={passwordError}
        id="standard-adornment-password"
        type={showPassword ? "text" : "password"}
        onChange={handleChange}
        variant="outlined"
        name="password"
        label="Password"
        helperText={post.errors.password ? "*Required" : ""}
        // endAdornment={
        //   <InputAdornment position="end">
        //     <IconButton
        //       aria-label="toggle password visibility"
        //       onClick={handleClickShowPassword}
        //       onMouseDown={handleMouseDownPassword}
        //     >
        //       {showPassword ? <VisibilityOff /> : <Visibility />}
        //     </IconButton>
        //   </InputAdornment>
        // }
        required
      />
      <Button variant="contained" color="success" type="submit">
        Sign up
      </Button>
      <hr />
      <Typography variant="caption" gutterBottom>
        Don't have an account? <Link href={"register"}>Signup</Link>
      </Typography>

      <Stack
        style={{
          width: "100%",
          padding: "0px",
          margin: "0px",
          display: "flex",
        }}
        spacing={2}
      >
        {formvalid && (
          <Alert
            severity="error"
            style={{
              width: "100%",
              margin: "0px",
              textAlign: "justify",
            }}
          >
            {formvalid}
          </Alert>
        )}
        {success && (
          <Alert
            severity="success"
            style={{
              width: "100%",
              margin: "0px",
              textAlign: "justify",
            }}
          >
            Login successful
            {success}
          </Alert>
        )}
      </Stack>
    </Box>
  );
};

export default Login;
