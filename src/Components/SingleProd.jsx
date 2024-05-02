import React, { useEffect, useState } from "react";
import { banner_image_url } from "../Api/apiurl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

const SingleProd = () => {
  let [state, setState] = useState();

  let api_url = banner_image_url;
  //   console.log("Image Url: ", api_url);

  let { id } = useParams();
  //   console.log("Params ID: ", id);

  useEffect(() => {
    axios
      .get(`${api_url}${id}`)
      .then((res) => {
        // console.log("Single Axios: ", res.data);
        setState(res.data);
      })
      .catch((err) => {
        console.log("Single Axios Error: ", err);
      });
  }, [setState, api_url, id]);
  console.log("Single State: ", state);

  return (
    <Container
      style={{
        maxHeight: "30rem",
        maxWidth: "60rem",
        margin: "0.5rem auto",
        padding: "0rem",
      }}
    >
      <div style={{ border: "2px solid black" }}>
        <img
          src={api_url + `${id}`}
          alt=""
          style={{
            maxHeight: "100rem",
            height: "auto",
            maxWidth: "100vh",
            width: "auto",
          }}
          className="img-fluid"
        ></img>
        <p
          style={{
            padding: "0.5rem",
            margin: "0rem",
            textAlign: "justify",
            backgroundColor: "white",
          }}
        >
          <b>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Cupiditate, est tempora. Voluptatem provident neque ipsa inventore
            nemo voluptas rerum. Commodi dolorum cum, totam aspernatur aperiam
            incidunt facere veniam! Libero, praesentium.
          </b>
        </p>
      </div>
    </Container>
  );
};

export default SingleProd;
