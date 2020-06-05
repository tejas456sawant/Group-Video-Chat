/** @format */

import React, { useEffect } from "react";
import Base from "./Base";
import { Button, Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import * as firebase from "firebase/app";
import "firebase/auth";

const Login = ({ history }) => {
  console.log(window.innerWidth, window.innerHeight);
  useEffect(() => {
    let user = firebase.auth().currentUser;
    if (user === null) {
      return history.push("/");
    }
    if (user !== null) {
      return history.push("/create");
    }
  }, [history]);

  const login = (provider) => {
    if (provider === "google") {
      let google = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(google)
        .then((result) => {
          history.push("/create");
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (provider === "facebook") {
      let facebook = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(facebook)
        .then((result) => {
          history.push("/create");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Base>
      <Container
        style={{ marginTop: `${window.innerHeight / 3}px` }}
        sm={4}
        md={8}
      >
        <Row className="justify-content-md-center">
          <Col sm={4} md={6}>
            <Button
              variant="outline-dark"
              size="lg"
              onClick={() => {
                login("google");
              }}
              block
            >
              <FaGoogle /> Google
            </Button>
          </Col>
          <Col sm={4} md={6}>
            <Button
              variant="outline-dark"
              size="lg"
              onClick={() => {
                login("facebook");
              }}
              block
            >
              <FaFacebookF /> Facebook
            </Button>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
