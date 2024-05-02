import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { base_url, reg_url } from "../../Api/apiurl";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import "./Create.css";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Create = () => {
  const api_url = base_url + reg_url;

  //input errors
  const [img, setImg] = useState();
  const [showPassword, setShowPassword] = React.useState(false);

  //Input validation
  const [formvalid, setFormvalid] = useState(null);
  const [success, setSuccess] = useState();
  const [nameError, setnameError] = useState();
  const [emailError, setemailError] = useState();
  const [passwordError, setpasswordError] = useState();
  const [imgError, setimgError] = useState();

  //validation for email
  const isEmail = (email) =>
    /^([a-z0-9.-]+)@([a-z]{5,12}).([a-z.]{2,20})$/i.test(email);

  //validation for password
  const isPassword = (pass) =>
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,20}$/i.test(pass);

  //validation
  const formValidation = (value) => {
    const err = { name: "", email: "", password: "", img: "" };
    setSuccess(null);
    if (!value.name || value.name.length < 5 || value.name.length > 20) {
      err.name = "Invalid";
      setnameError(true);
    } else {
      setnameError(false);
    }

    if (!isEmail(value.email)) {
      setemailError(true);
    } else {
      setemailError(false);
    }

    if (!isPassword(value.password)) {
      setpasswordError(true);
    } else {
      setpasswordError(false);
    }

    // if (!value.img) {
    //   setimgError(true);
    // } else {
    //   setimgError(false);
    // }
    setFormvalid(null);
  };

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      img: "",
    },
    validate: formValidation,

    onSubmit: (data) => {
      if (nameError) {
        setFormvalid(
          "Username should be 5 - 15 characters and shouldn't include any special characters!"
        );
        return;
      }

      if (emailError) {
        setFormvalid("Email is invalid. Pleae re-enter.");
        return;
      }

      if (passwordError) {
        setFormvalid(
          "Invalid Password: Minimum length of 8 characters. Include at least one uppercase letter, lowercase letter, number. special character (e.g., !, @, #, $)."
        );
        return;
      }

      // if (imgError) {
      //   setFormvalid("Please upload an image in .jpg format.");
      //   return;
      // }
      // alert("Signup Successful.");
      setSuccess("Signup successful.");
      // console.log("Submitted Data: ", data);

      let user = {
        name: data.name,
        email: data.email,
        password: data.password,
        // My_img: data.img,
      };

      

      axios
        .post(api_url, user)
        .then((res) => {
          console.log("Axios sent: ", res.data);
          formik(res.data);
        })
        .catch(
          (err) => {
            console.log("Axios sent err: ", err);
          },
          [api_url, user]
        );
    },
  });

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
      onSubmit={formik.handleSubmit}
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
        id="standard-basic"
        // error={nameError}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        onChange={formik.handleChange}
        name="name"
        label="Name"
        variant="standard"
      />
      {formik.touched.name && formik.errors.name ? (
        <p>{formik.errors.name}</p>
      ) : null}{" "}
      <br />
      <TextField
        id="standard-basic1"
        // error={emailError}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        onChange={formik.handleChange}
        name="email"
        label="Email"
        variant="standard"
      />
      {formik.touched.email && formik.errors.email ? (
        <p>{formik.errors.email}</p>
      ) : null}{" "}
      <br />
      <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          // error={passwordError}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onChange={formik.handleChange}
          name="password"
          label="Password"
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
        />
      </FormControl>
      <br />
      <input
        type="file"
        onChange={(event) => handleImage(event.target.files[0])}
      />
      <br />
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
            {success}
          </Alert>
        )}
      </Stack>
    </Box>
  );
};

export default Create;
