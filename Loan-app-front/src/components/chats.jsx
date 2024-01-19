import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate } from "react-router-dom";
import { apiURI } from "./config";
function Chats() {
  const fileInputRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");

  const handleClick = () => {
    navigate("/loan");
  };

  const userSubmit = async (event) => {
    event.preventDefault();
    if (loginEmail === "" || loginPassword === "") {
      alert("Email and Password are mandatory");
      return;
    }

    await fetch(apiURI.URL + "api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    })
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        return response.json(); // parse response body as JSON
      })
      .then((data) => {
        console.log("Full Response from Backend:", data);
        if (data.message === "Error in Email or Password") {
          alert("Email or Password not Matched");
        } else if (data.message === "User Matched") {
          alert("Loggin success");
          setloginEmail("");
          setloginPassword("");
          handleClick();
          localStorage.setItem("userID", data.data.userId);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleValidateSubmit = async (event) => {
    event.preventDefault();

    if (userPassword !== userConfirmPassword) {
      alert("Password not match");
      return;
    }

    await fetch(apiURI.URL + "api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // parse response body as JSON
      })
      .then((data) => {
        if (data.message === "User Created Successfull") {
          setUserName("");
          setUserEmail("");
          setUserPassword("");
          setUserConfirmPassword("");
          setFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          alert("User Created");
          localStorage.setItem("userID", data.data.userId);
          handleClick();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          width: "35rem",
          height: "600px",
        }}
      >
        <Card.Body>
          <Card.Title className="text-center">Loan Application</Card.Title>
          <Card.Text>
            <Tabs
              defaultActiveKey="login"
              id="justify-tab-example"
              className="mb-3 mt-5"
              justify
            >
              <Tab eventKey="login" title="Login">
                <Form onSubmit={userSubmit}>
                  <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Enter Your Email Address"
                      onChange={(e) => setloginEmail(e.target.value)}
                      value={loginEmail}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="validationCustom02">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="Password"
                      placeholder="Enter Password"
                      onChange={(e) => setloginPassword(e.target.value)}
                      value={loginPassword}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2 mt-3">
                    <Button type="submit" variant="primary" size="md">
                      Login
                    </Button>
                  </div>
                </Form>
              </Tab>
              <Tab eventKey="signup" title="Sign Up">
                <Form onSubmit={handleValidateSubmit}>
                  <Form.Group as={Col} controlId="validationCustom09">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Your Name"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="validationCustom10">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Enter Your Email Address"
                      onChange={(e) => setUserEmail(e.target.value)}
                      value={userEmail}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="validationCustom03">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="Password"
                      placeholder="Enter Password"
                      onChange={(e) => setUserPassword(e.target.value)}
                      value={userPassword}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="validationCustom04">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      required
                      type="Password"
                      placeholder="Confirm Password"
                      onChange={(e) => setUserConfirmPassword(e.target.value)}
                      value={userConfirmPassword}
                    />
                  </Form.Group>
                  {/* <Form.Group as={Col} controlId="validationCustom05">
                    <Form.Label>Upload Your Picture</Form.Label>
                    <Form.Control
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                    />
                  </Form.Group> */}

                  <div className="d-grid gap-2 mt-3">
                    <Button type="submit" variant="primary" size="md">
                      Sign Up
                    </Button>
                  </div>
                </Form>
              </Tab>
            </Tabs>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Chats;
