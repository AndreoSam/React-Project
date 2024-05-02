import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import IconButton from "@mui/material/IconButton";
// import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { add_url, get_url } from "../Api/apiurl";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  let Add_url = add_url;
  let Get_url = get_url;


  //Input validation
  const [formvalid, setFormvalid] = useState(null);
  const [success, setSuccess] = useState(null);
  const [nameError, setnameError] = useState();
  const [phoneError, setphoneError] = useState();
  const [emailError, setemailError] = useState();
  const [passwordError, setpasswordError] = useState();
  const [showPassword, setShowPassword] = React.useState(false);

  //validation for email and password
  const isEmail = (email) =>
    /^([a-z0-9.-]+)@([a-z]{5,12}).([a-z.]{2,20})$/i.test(email);
  const isPassword = (pass) =>
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,20}$/i.test(pass);

  let navigation = useNavigate();

  let [post, setPost] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    errors: { id: "", name: "", email: "", phone: "", password: "" },
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    // console.log(`${name}: ${value}`);
    let err = post.errors;
    setPost({ ...post, [name]: value, errors: err });

    switch (name) {
      case "name":
        if (!value.length || value.length < 5 || value.length > 15) {
          setnameError(true);
          err.name =
            "Name should be 5 - 15 characters and shouldn't include any special characters!";
        } else {
          setnameError(false);
          err.name = "";
        }
        break;

      case "email":
        if (!isEmail(value)) {
          setemailError(true);
          err.email = "Email is invalid. Pleae re-enter.";
        } else {
          setemailError(false);
          err.email = "";
        }
        break;

      case "phone":
        if (!value || value.length < 10 || value.length > 10) {
          setphoneError(true);
          err.phone = "Phone number must be of 10 digits.";
        } else {
          setphoneError(false);
          err.phone = "";
        }
        break;

      case "password":
        if (!isPassword(value)) {
          setpasswordError(true);
          err.password =
            "Invalid Password: Minimum length of 8 characters. Include at least one uppercase letter, lowercase letter, number. special character (e.g., !, @, #, $).";
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
    if (!post.name || !post.email || !post.phone || !post.password) {
      setFormvalid(true);
      setFormvalid("*All the above fields are mandatory!");
    } else {
      setFormvalid(false);

      let prod = {
        name: post.name,
        email: post.email,
        phone: post.phone,
        password: post.password,
      };

      axios
        .get(Get_url)
        .then((res) => {
          console.log("Axios Receieved: ", res.data.data);
          const existName = res.data.data.find(
            (u) => u.name.toLowerCase() === post.name.toLowerCase()
          );
          const existEmail = res.data.data.find((u) => u.email === post.email);

          if (existName) {
            alert("Name already exist!");
          } else if (existEmail) {
            alert("Email already exist!");
          } else {
            axios
              .post(Add_url, prod)
              .then((res) => {
                if(res.status===200){
                    window.localStorage.setItem('token',res.data.student.token)
                }
                else{
                    alert('not done')
                }
                console.log("Sent data: ", res);
              })
              .catch((err) => {
                console.log("Sent error: ", err);
              });
            setSuccess(true);
            console.log("Submitted value: ", post);
            alert("Registration Successfull");
            navigation("/");
          }
        })
        .catch((err) => {
          console.log("Axios Error: ", err);
        });
    }

    console.log("Submitted Value: ", post);
  };

  //alert

  //password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        Registration
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
        error={nameError}
        id="filled-error-helper-text"
        onChange={handleChange}
        variant="outlined"
        name="name"
        label="Name"
        helperText={
          post.errors.name
            ? "*Username should be 5 - 15 characters and shouldn't include any special characters!"
            : ""
        }
        required
      />
      <TextField
        type="number"
        error={phoneError}
        id="filled-error-helper-text2"
        onChange={handleChange}
        variant="outlined"
        name="phone"
        label="Phone no."
        helperText={
          post.errors.phone ? "*Phone number must be of 10 digits." : ""
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
        helperText={
          post.errors.password
            ? "*Invalid Password: Minimum length of 8 characters. Include at least one uppercase letter, lowercase letter, number. special character (e.g., !, @, #, $)."
            : ""
        }
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
        Have an account?<Link href={"/"}>Login</Link>
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
  );
};

export default Registration;
