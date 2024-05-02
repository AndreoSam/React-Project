import React, { useEffect, useState } from "react";
import { base_url, original_base_url, profile_endpoint } from "../../Api/apiurl";
import axios from "axios";
// import { Box } from '@mui/material'
import { Card } from "react-bootstrap";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Link } from "@mui/material";

const Profile = () => {
    let api_url = original_base_url + profile_endpoint;

    const [state, setState] = useState({
        first_name: "",
        last_name: "",
        email: "",
        profile_pic: "",
    });

    const token = window.sessionStorage.getItem("token");

    useEffect(() => {
        axios
            .get(api_url, {
                headers: {
                    "x-access-token": token,
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((res) => {
                if (res.data.status === 200) {
                    let folder_path = 'uploads/user/profile_pic/'
                    let img_path = base_url + folder_path + res.data.data.profile_pic
                    console.log("Profile axios: ", img_path);
                    setState({
                        ...state, fname: res.data.data.first_name,
                        lname: res.data.data.last_name,
                        email: res.data.data.email,
                        image: img_path,
                    });
                }
            })
            .catch((err) => {
                console.log("Profile axios error: ".err);
            });
    }, [api_url]);

    console.log("image url: ", state.profile_pic);

    return (
        <Card
            style={{
                maxWidth: "600px",
                margin: "auto",
                alignItems: "center",
                alignContent: "center",
            }}
        >
            <CardMedia
                style={{ height: "600px" }}
                image={state.profile_pic}
            // title={state.first_name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {state.first_name} {state.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Email ID: {state.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Created on: {state.createdAt}
                </Typography>
            </CardContent>
            <Typography variant="caption" gutterBottom>
                <Link href={"loginapi"}>Logout</Link>
            </Typography>
        </Card>
    );
};

export default Profile;
