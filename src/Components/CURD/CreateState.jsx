import React, { useState } from "react";
import { base_url, reg_url } from "../../Api/apiurl";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import "./Create.css";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
const CreateState = () => {
  const api_url = base_url + reg_url;
  let [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    errors: { name: "", email: "", password: "" },
  });

  //input errors
  const [img, setImg] = useState();
  const [showPassword, setShowPassword] = React.useState(false);

  //Input validation
  const [formvalid, setFormvalid] = useState(null);
  const [success, setSuccess] = useState(null);
  const [nameError, setnameError] = useState();
  const [emailError, setemailError] = useState();
  const [passwordError, setpasswordError] = useState();
  //   const [imgError, setimgError] = useState();

  //validation for email
  const isEmail = (email) =>
    /^([a-z0-9.-]+)@([a-z]{5,12}).([a-z.]{2,20})$/i.test(email);

  //validation for password
  const isPassword = (pass) =>
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,20}$/i.test(pass);

  //onchange function
  const handleChange = (event) => {
    let { name, value } = event.target;
    let err = state.errors;
    setState({ ...state, [name]: value, errors: err });

    switch (name) {
      case "name":
        if (!value.length || value.length < 5 || value.length > 15) {
          setnameError(true);
          err.name =
            "Username should be 5 - 15 characters and shouldn't include any special characters!";
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

      //   case "image":
      //     if (!value) {
      //       setimgError(true);
      //     } else {
      //       setimgError(false);
      //     }
      //     break;

      default:
        console.log("");
    }
  };

  //submithandler function
  let handleSubmit = (event) => {
    event.preventDefault();
    if (!state.name || !state.email || !state.password || !img) {
      setFormvalid(true);
      setFormvalid("*All the above fields are mandatory!");
    } else {
      setFormvalid(false);

      let user = {
        name: state.name,
        email: state.email,
        password: state.password,
        my_img: img,
      };

      axios
        .get(api_url)
        .then((res) => {
          console.log("Axios data: ", res.data);
          //   const nameLower = res.data.name.toLowerCase();
          //   console.log("NameLower: ", nameLower);

          const existName = res.data.find(
            (u) => u.name.toLowerCase() === state.name.toLowerCase()
          );
          const existEmail = res.data.find((u) => u.email === state.email);

          if (existName) {
            alert("Name already exist!");
          } else if (existEmail) {
            alert("Email already exist!");
          } else {
            axios
              .post(api_url, user)
              .then((res) => {
                console.log("Sent data: ", res);
              })
              .catch((err) => {
                console.log("Sent error: ", err);
              });
            setSuccess(true);
            console.log("Submitted value: ", state, img);
          }
        })
        .catch((err) => {
          console.log("Axios error: ", err);
        });
    }
  };

  //submitting image file
  const handleImage = (file) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setImg(fileReader.result);
    });
    fileReader.readAsDataURL(file);
  };

  //password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      className="create_box"
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      style={{
        maxWidth: "350px",
        marginTop: "50px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        lineHeight: "1",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{
          width: "100%",
          margin: "0px",
          padding: "0px",
        }}
      >
        ADD USER
      </Typography>
      <hr />
      <TextField
        error={nameError}
        id="filled-error-helper-text"
        onChange={handleChange}
        variant="standard"
        name="name"
        label="Name"
        helperText={
          state.errors.name
            ? "*Username should be 5 - 15 characters and shouldn't include any special characters!"
            : ""
        }
        required
      />
      <TextField
        error={emailError}
        id="standard-basic1"
        onChange={handleChange}
        variant="standard"
        name="email"
        label="Email"
        helperText={
          state.errors.email ? "*Email is invalid. Pleae re-enter." : ""
        }
        required
      />
      <TextField
        error={passwordError}
        id="standard-adornment-password"
        onChange={handleChange}
        variant="standard"
        name="password"
        label="Password"
        helperText={
          state.errors.password
            ? "*Invalid Password: Minimum length of 8 characters. Include at least one uppercase letter, lowercase letter, number. special character (e.g., !, @, #, $)."
            : ""
        }
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        required
      />
      <br />
      <input
        type="file"
        name="image"
        onChange={(event) => handleImage(event.target.files[0])}
      />

      <hr />

      <Button variant="contained" type="submit">
        Add
      </Button>

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

export default CreateState;
