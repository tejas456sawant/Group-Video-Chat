/** @format */

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  ButtonGroup,
} from "react-bootstrap";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";

const StyledVideo = styled.video`
  height: 100%;
  width: 100%;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  });

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 1.5,
  width: window.innerWidth / 2,
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);

  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = props.match.params.roomID;

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_backend);
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: false })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          let peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
          peers = [];
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, [roomID]);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={9}>
          <Row className="justify-content-md-center carousel-caption">
            <ButtonGroup className="mb-2" size="lg">
              <Button variant="light" size="lg">
                <MdMic />
              </Button>

              <Button variant="light" size="lg">
                <MdVideocam />
              </Button>
            </ButtonGroup>
          </Row>
          <StyledVideo muted ref={userVideo} autoPlay playsInline />
        </Col>
        <Col sm={12} md={3}>
          {peers.map((peer, index) => (
            <Card key={index}>
              <Video key={index} peer={peer} />
              <Card.Body>
                <Row className="justify-content-md-center">
                  <Col sm={4} md={6}>
                    <Button variant="outline-dark">Tejas Sawant</Button>
                  </Col>
                  <Col sm={4} md={3}>
                    <Button variant="outline-dark">
                      <MdMic />
                    </Button>
                  </Col>
                  <Col sm={4} md={3}>
                    <Button variant="outline-dark">
                      <MdVideocam />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Room;
