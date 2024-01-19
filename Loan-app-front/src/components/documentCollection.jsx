import React, { useState, useEffect } from "react";
import Salaired from "./salaried";
import SelfEmployed from "./selfEmployed";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { apiURI } from "./config";
function DocumentCollection() {
  const [aadharCard, setAadharCard] = useState("");
  const [passport, setPassport] = useState("");
  const [voterId, setVoterId] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [occupation, setOccupation] = useState("salaried");
  const [userID, setuserId] = useState("");
  const [document, setDocument] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserId = localStorage.getItem("userID");
    setuserId(storedUserId);

    if (!storedUserId || storedUserId === "") {
      navigate("/");
    } else {
      getDocument();
    }
  }, []);

  const handlePrev = () => {
    navigate("/employment");
  };
  const identificationSubmit = async (e) => {
    e.preventDefault();
    console.log(aadharCard, passport, voterId, drivingLicense);
    await fetch(apiURI.URL + "api/employment/document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aadharCard: aadharCard,
        passport: passport,
        voterId: voterId,
        drivingLicense: drivingLicense,
        userID: userID,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // parse response body as JSON
      })
      .then((data) => {
        if (data.message === "Failed to add the Document details") {
          alert("Failed to add the Document details");
        } else if (data.message === "Document Created Successfull") {
          toast.success("Document Details are saved", {
            position: "top-right",
            autoClose: 3000,
          });
          setAadharCard("");
          setPassport("");
          setVoterId("");
          setDrivingLicense("");
          getDocument();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getDocument = async () => {
    const user = await localStorage.getItem("userID");
    try {
      await fetch(apiURI.URL + `api/employment/document/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "success") {
            setDocument(data.data);
            console.log(document, "document");
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    setOccupation(localStorage.getItem("occupation"));
  }, [occupation]);
  return (
    <>
      <div className="container">
        <h2>Documents Collection</h2>
        <button
          type="button"
          className="btn btn-danger mt-2 text-white"
          onClick={handlePrev}
        >
          Previous
        </button>
        <h4 className="text-center">Identification Proof</h4>
        <form
          onSubmit={identificationSubmit}
          style={
            document && document.length > 0
              ? { display: "none" }
              : { display: "block" }
          }
        >
          <div class="row mb-2">
            <label for="aadharCard" class="col-sm-2 col-form-label">
              Aadhaar Card
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="aadharCard"
                placeholder="Enter aadhar card number 8123-4902-1234"
                required
                pattern="^\d{4}-\d{4}-\d{4}$"
                maxlength="15"
                value={aadharCard}
                onChange={(e) => {
                  setAadharCard(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="row mb-2">
            <label for="passport" class="col-sm-2 col-form-label">
              Passport
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="passport"
                placeholder="Passport Number ABC123"
                pattern="^[A-Z0-9]{6,15}$"
                required
                value={passport}
                onChange={(e) => {
                  setPassport(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="row mb-2">
            <label for="voterId" class="col-sm-2 col-form-label">
              Voter Id
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="voterId"
                placeholder="Enter Your Voter ID Number"
                maxlength="10"
                required
                value={voterId}
                onChange={(e) => {
                  setVoterId(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="row mb-2">
            <label for="drivingLicense" class="col-sm-2 col-form-label">
              Driving License
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="drivingLicense"
                placeholder="Enter Your Driving License Number"
                required
                maxlength="16"
                value={drivingLicense}
                onChange={(e) => {
                  setDrivingLicense(e.target.value);
                }}
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary">
            Save
          </button>
        </form>
        <table
          className="table mt-3 mb-3"
          style={
            document && document.length === 0
              ? { display: "none" }
              : { display: "block" }
          }
        >
          <thead>
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Aadhaar Card</th>
              <th className="p-3">Passport</th>
              <th className="p-3">Voter Id</th>
              <th className="p-3">Driving License</th>
            </tr>
          </thead>
          <tbody>
            {document &&
              document.map((document, index) => (
                <tr key={document._id}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{document.aadharCard}</td>
                  <td className="p-3">{document.passport}</td>
                  <td className="p-3">{document.voterId}</td>
                  <td className="p-3">{document.drivingLicense}</td>
                  {/* Add more table cells if needed */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {occupation === "salaried" ? <Salaired /> : ""}
      {occupation === "selfemployee" ? <SelfEmployed /> : ""}
      <ToastContainer />
    </>
  );
}

export default DocumentCollection;
