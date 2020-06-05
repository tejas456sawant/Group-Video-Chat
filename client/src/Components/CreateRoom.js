/** @format */

import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import * as firebase from "firebase/app";
import Base from "./Base";
import {
  Button,
  Container,
  Row,
  Col,
  Modal,
  FormControl,
} from "react-bootstrap";
import { MdVideocam, MdKeyboard } from "react-icons/md";

const CreateRoom = ({ history }) => {
  const [show, setShow] = useState(false);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    /*let user = firebase.auth().currentUser;
    if (user === null) {
      return history.push("/");
    }
    if (user !== null) {
      return history.push("/create");
    }*/
  }, [history]);

  const create = () => {
    const id = v4();
    history.push(`/room/${id}`);
  };

  return (
    <Base>
      <Container sm={4} md={8}>
        <Row className='justify-content-md-center'>
          <Col sm={12} md={6} style={{ marginTop: "25%" }}>
            <Button variant='outline-dark' onClick={create} size='lg' block>
              <MdVideocam />
              {"     "}
              Create Room
            </Button>
            <Button
              variant='outline-dark'
              onClick={() => setShow(true)}
              size='lg'
              block>
              <MdKeyboard />
              {"     "}
              Join Room
            </Button>
          </Col>
          <Col sm={12} md={6}></Col>
        </Row>
      </Container>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop='static'
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Room ID</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder='cb4456c3-88f0-4870-9c16-5e84c2c1837d'
            aria-label='Enter Room ID'
            aria-describedby='basic-addon2'
            onChange={(event) => {
              setRoomId(event.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              history.push(`/room/${roomId}`);
            }}>
            Join
          </Button>
        </Modal.Footer>
      </Modal>
    </Base>
  );
};

export default CreateRoom;
