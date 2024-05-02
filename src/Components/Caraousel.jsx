import React, { useEffect, useState } from "react";
import { all_banner_url } from "../Api/apiurl";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

const Caraousel = () => {
  let api_url = all_banner_url;
  //   console.log(all_banner_url);
  let [state, setState] = useState([]);

  useEffect(() => {
    axios
      .get(api_url)
      .then((res) => {
        console.log("Axios Receieved: ", res.data.bannerdata);
        setState(res.data.bannerdata);
      })
      .catch((err) => {
        console.log("Axios Error: ", err);
      });
  }, [setState, api_url]);

  return (
    <Container>
      <Card style={{ marginTop: "0.5rem", boxShadow: "0.5rem 0.5rem 1rem" }}>
        <h1>CAROUSEL TITLE</h1>
      </Card>
      <br />
      <Row>
        {state.map((user) => (
          <React.Fragment key={user._id}>
            <Col lg={6} md={6} sm={12}>
              <Card style={{ boxShadow: "0.5rem 0.5rem 1rem" }}>
                <Card.Body>
                  <Card.Title style={{backgroundColor:"Gray"}}>
                    <h3>
                      {user.title}
                    </h3>
                  </Card.Title>
                  <hr />
                  <Card.Subtitle className="mb-2 text-muted">
                    <b>Created on: </b> {user.createdAt}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    <b>Updated on: </b>
                    {user.updatedAt}
                  </Card.Subtitle>
                  <Card.Text style={{ textAlign: "Justify" }}>
                    {user.description}
                  </Card.Text>
                  <Link to={`single/${user._id}`}>
                    <Button> More Details</Button>
                  </Link>
                </Card.Body>
              </Card>
              <br />
            </Col>
          </React.Fragment>
        ))}
      </Row>
    </Container>
  );
};

export default Caraousel;
