import React, { useState } from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { original_base_url, login_endpoint } from "../Api/apiurl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const LoginApi = () => {
  let api_url = original_base_url + login_endpoint;
  // console.log("Api Url: ", api_url);

  let navigation = useNavigate();

  let [img, setImg] = useState()

  let [state, setState] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  })

  //Input validation
  const [formvalid, setFormvalid] = useState(null);
  const [success, setSuccess] = useState(null);

  const [emailError, setemailError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  //validation for email and password
  const isEmail = (email) =>
    /^([a-z0-9.-]+)@([a-z]{5,12}).([a-z.]{2,20})$/i.test(email);

  //password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    // console.log(`${name}: ${value}`);
    let err = state.errors;

    switch (name) {
      case "email":
        if (!isEmail(value)) {
          setemailError(true);
          err.email = "Email is invalid. Pleae re-enter.";
        } else {
          setemailError(false);
        }
        break;
      default:
        console.log("");
        break;
    }

    setState({ ...state, [name]: value, errors: err });
  };

  // const handleImage = (file) => {
  //   const fileReader = new FileReader()
  //   fileReader.addEventListener('load', () => {
  //     setImg(fileReader.result)
  //   })
  //   fileReader.readAsDataURL(file)
  // }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!state.email || !state.password) {
      setFormvalid(true);
      setFormvalid("*All the above fields are mandatory!");
    } else {
      setFormvalid(false);
      console.log("Submitted Value: ", state, img);

      let prod = new FormData()
      prod.append('email', state.email)
      prod.append('password', state.password)

      axios.post(api_url, prod,
        {
          headers: {
            "Content-Type": "application/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          console.log("Axios login: ", res.data);
          setState(res.data)
          if (res.data.status == 200) {
            window.sessionStorage.setItem("token", res.data.token)
            alert("Login Successfull!")
            navigation("/profile")
          } else {
            alert(res.data.message)
          }
        }).catch((err) => {
          console.log("Axios login error: ", err);
        })
    }
  };

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
        height: "400px",
        maxWidth: "500px",
        boxShadow: "8px 8px 10px black",
        margin: "auto",
        marginTop: "50px",
        marginBottom: "50px",
        padding: "1rem",
      }}
    >
      <Typography variant="h4" fontWeight={"bolder"}>
        Login
      </Typography>
      <hr />

      <TextField
        error={emailError}
        id="email_id"
        type="email"
        onChange={handleChange}
        variant="outlined"
        name="email"
        label="Email"
        helperText={
          emailError
            ? state.errors.email
            : ""
        }
        required
      />

      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          error={passwordError}
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          name="password"
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <Button variant="contained" color="success" type="submit">
        Login
      </Button>
      <hr />
      <Typography variant="body2" gutterBottom>
        Have an account?<Link href={"/"}>Sign up</Link>
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
            Signup successful
            {success}
          </Alert>
        )}
      </Stack>
    </Box>
  )
}

export default LoginApi