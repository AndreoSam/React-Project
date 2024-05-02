import React, { useEffect, useState } from "react";
import { base_url, reg_url } from "../../Api/apiurl";
import axios from "axios";

const View = () => {
  const api_url = base_url + reg_url;

  const token = window.sessionStorage.getItem("token");

  useEffect = () => {
    axios
      .get(api_url, {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log("Axios: ", res);
      })
      .catch((err) => {
        console.log("Axios Error: ", err);
      });
  };

  return <div></div>;
};

export default View;
