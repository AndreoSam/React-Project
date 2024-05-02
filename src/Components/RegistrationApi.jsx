import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { original_base_url, registration_endpoint } from "../Api/apiurl";
import FormControl from "@mui/material/FormControl";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const RegistrationApi = () => {
    let api_url = original_base_url + registration_endpoint;
    // console.log("Api Url: ", api_url);

    let navigation = useNavigate();

    let [img, setImg] = useState();

    let [state, setState] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        errors: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        },
    });

    //Input validation
    const [formvalid, setFormvalid] = useState(null);
    const [success, setSuccess] = useState(null);

    const [fnameError, setfnameError] = useState(false);
    const [lnameError, setlnameError] = useState(false);
    const [emailError, setemailError] = useState(false);
    const [passwordError, setpasswordError] = useState(false);

    //validation for email and password
    const isEmail = (email) =>
        /^([a-z0-9.-]+)@([a-z]{5,12}).([a-z.]{2,20})$/i.test(email);
    const isPassword = (pass) =>
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,20}$/i.test(pass);

    const handleChange = (event) => {
        let { name, value } = event.target;
        // console.log(`${name}: ${value}`);
        let err = state.errors;
        setState({ ...state, [name]: value, errors: err });

        switch (name) {
            case "first_name":
                if (!value.length || value.length < 5 || value.length > 15) {
                    setfnameError(true);
                    err.first_name =
                        "First name should be 5 - 15 characters and shouldn't include any special characters!";
                } else {
                    setfnameError(false);
                    // err.first_name = "";
                }
                break;

            case "last_name":
                if (!value.length || value.length < 5 || value.length > 15) {
                    setlnameError(true);
                    err.last_name =
                        "Last name should be 5 - 15 characters and shouldn't include any special characters!";
                } else {
                    setlnameError(false);
                    // err.last_name = "";
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
                if (!isPassword(value) || value.length < 8) {
                    setpasswordError(true);
                    err.password =
                        "Invalid Password: Minimum length of 8 characters. Include at least one uppercase letter, lowercase letter, number. special character (e.g., !, @, #, $).";
                } else {
                    setpasswordError(false);
                    // err.password = "";
                }
                break;
            default:
                console.log("");
                break;
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (
            !state.first_name ||
            !state.last_name ||
            !state.email ||
            !state.password
        ) {
            setFormvalid(true);
            setFormvalid("*All the above fields are mandatory!");
        } else {
            setFormvalid(false);

            let prod = new FormData();
            prod.append("first_name", state.first_name);
            prod.append("last_name", state.last_name);
            prod.append("email", state.email);
            prod.append("password", state.password);
            prod.append("profile_pic", img);

            axios
                .post(api_url, prod)
                .then((res) => {
                    console.log("Axios sent: ", res.data);
                    setState(res.data);
                    if (res.data.status == 201) {
                        window.sessionStorage.setItem("token", res.data.token);
                        // alert(res.data.message)
                        alert("Email already exist");
                    }
                    else {
                        setSuccess(true);
                        alert("Registration Successfull!");
                        navigation("/loginapi");
                    }
                })
                .catch((err) => {
                    console.log("Axios error: ", err);
                });
        }
        console.log("Submitted Value: ", state, img);
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
                flexDirection: "row",
                padding: "0px",
            }}
        >
            <Box
                style={{
                    backgroundColor: "orange",
                    margin: "0px",
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "Center",
                    justifyContent: "center",
                    padding: "10px",
                    gap: "50px",
                }}
            >
                <Typography
                    variant="h3"
                    fontWeight={"bolder"}
                    style={{
                        color: "white",
                        display: "flex",
                        alignItems: "Center",
                        justifyContent: "center",
                    }}
                >
                    Create your account
                </Typography>
                <Box
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: "20px",
                        textAlign: "left",
                        maxWidth: "300px"
                    }}
                >
                    <Button
                        variant="contained"
                        coloe="darkblue"
                        type="submit"
                        size="large"
                        startIcon={<FacebookIcon />}
                    >
                        Sign in with Facebook
                    </Button>
                    <Button
                        variant="contained"
                        color="info"
                        type="submit"
                        size="large"
                        startIcon={<TwitterIcon />}
                    >
                        Sign in with Twitter
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        type="submit"
                        size="large"
                        startIcon={<GoogleIcon />}
                    >
                        Sign in with Google
                    </Button>
                    <Button
                        variant="contained"
                        color="info"
                        type="submit"
                        size="large"
                        startIcon={<LinkedInIcon />}
                    >
                        Sign in with Linkedin
                    </Button>
                </Box>
            </Box>

            <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    maxHeight: "90vh",
                    width: "100%",
                    // border: "2px solid black",
                    gap: "10px",
                    padding: "10px",
                }}
            >
                <Box
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                    }}
                >
                    <Typography variant="h4" fontWeight={"bolder"}>
                        Welcome!
                    </Typography>
                    <Typography variant="body2">
                        Fanny pack hexagon food truck, street art waistcoat kitsch.
                    </Typography>
                </Box>
                <hr style={{ margin: "0px", padding: "0px" }} />
                <Box
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "10px"
                        }}
                    >
                        <TextField
                            error={fnameError}
                            id="fname_id"
                            type="text"
                            onChange={handleChange}
                            variant="outlined"
                            name="first_name"
                            label="First name"
                            required
                            fullWidth
                            helperText={
                                fnameError
                                    ? state.errors.first_name
                                    : ""
                            }
                        />
                        <TextField
                            error={lnameError}
                            id="lname_id"
                            type="text"
                            onChange={handleChange}
                            variant="outlined"
                            name="last_name"
                            label="Last name"
                            fullWidth
                            required
                            helperText={
                                lnameError
                                    ? state.errors.last_name
                                    : ""
                            }
                        />
                    </Box>

                    <TextField
                        error={emailError}
                        id="email_id"
                        type="email"
                        onChange={handleChange}
                        variant="outlined"
                        name="email"
                        label="Email"
                        helperText={emailError ? state.errors.email : ""}
                        required
                    />


                    <FormControl variant="outlined">
                        <TextField
                            error={passwordError}
                            id="password_id"
                            type="password"
                            onChange={handleChange}
                            variant="outlined"
                            name="password"
                            label="Password"
                            required
                            helperText={
                                passwordError
                                    ? state.errors.password
                                    : ""
                            }
                        >
                        </TextField>

                    </FormControl>

                    <input
                        type="file"
                        name="image"
                        style={{ maxWidth: "210px" }}
                        onChange={(event) => setImg(event.target.files[0])}
                    />
                </Box>
                <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    style={{ display: "flex", justify: "center", width: "200px" }}
                >
                    Sign up
                </Button>
                <hr style={{ margin: "0px" }} />
                <Typography variant="body2" gutterBottom>
                    Have an account?<Link href={"loginapi"}>Login</Link>
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
        </Box>
    );
};

export default RegistrationApi;
