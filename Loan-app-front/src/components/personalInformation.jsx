import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { apiURI } from "./config";
function PersonalInformation() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [dependents, setDependents] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [isPermanentAddressSame, setPermanentAddressSame] = useState(false);
  const [userID, setuserId] = useState("");
  const [personalDetails, setPersonalDetails] = useState("");
  useEffect(() => {
    setuserId(localStorage.getItem("userID"));
    getPersonal();
  }, [userID]);
  const handleClick = () => {
    navigate("/loan");
  };
  const personalSubmit = async (e) => {
    e.preventDefault();

    await fetch(apiURI.URL + "api/loan/personalDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        dob: dob,
        gender: gender,
        nationality: nationality,
        dependents: dependents,
        maritalStatus: maritalStatus,
        residentialAddress: residentialAddress,
        state: state,
        country: country,
        pincode: pincode,
        isPermanentAddressSame: isPermanentAddressSame,
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
        if (data.message === "Failed to add the loan details") {
          alert("Failed to add the loan details");
        } else {
          toast.success("Personal Details are saved", {
            position: "top-right",
            autoClose: 3000,
          });
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setDob("");
          setGender("");
          setNationality("");
          setDependents("");
          setMaritalStatus("");
          setResidentialAddress("");
          setState("");
          setCountry("");
          setPincode("");
          setPermanentAddressSame(false);
          getPersonal();
          handleClick();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getPersonal = async () => {
    const user = await localStorage.getItem("userID");
    try {
      await fetch(apiURI.URL + `api/loan/personalDetails/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "success") {
            setPersonalDetails(data.data);
            console.log(personalDetails, "personalDetails");
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleEmployee = () => {
    navigate("/employment");
  };
  return (
    <>
      <div className="container mt-2">
        <h2> Personal Information</h2>

        <form
          onSubmit={personalSubmit}
          style={
            personalDetails && personalDetails.length > 0
              ? { display: "none" }
              : { display: "block" }
          }
        >
          <div className="row">
            <div className="form-group col-md-6">
              <label for="first">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first"
                placeholder="Enter Your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label for="last">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last"
                placeholder="Enter Your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="form-group col-md-6">
              <label for="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label for="phone">Phone No</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="Enter Your Mobile Number"
                pattern="[0-9]{10}"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="form-group col-md-6">
              <label for="dob">Date Of Birth</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label style={{ width: "100%" }}>Gender</label>
              <div className="mt-1">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    required
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />
                  <label class="form-check-label" for="inlineRadio1">
                    Male
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    Female
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="others"
                    checked={gender === "others"}
                    onChange={() => setGender("others")}
                  />
                  <label class="form-check-label" for="inlineRadio3">
                    Others
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="form-group col-md-4">
              <label for="nationality">Nationality</label>
              <input
                type="text"
                className="form-control"
                id="nationality"
                placeholder="Enter Your Nationality"
                required
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label for="dependents">Number of Dependents</label>
              <input
                type="number"
                className="form-control"
                id="dependents"
                placeholder="Enter Your Family Members [0-9]"
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
                required
                min="0"
                max="9"
              />
            </div>
            <div className="form-group col-md-4">
              <label style={{ width: "100%" }}>Marital Status</label>
              <div className="mt-1">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions1"
                    id="inlineRadio41"
                    required
                    value="single"
                    checked={maritalStatus === "single"}
                    onChange={() => setMaritalStatus("single")}
                  />
                  <label class="form-check-label" for="inlineRadio41">
                    Single
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions1"
                    id="inlineRadio51"
                    value="married"
                    checked={maritalStatus === "married"}
                    onChange={() => setMaritalStatus("married")}
                  />
                  <label class="form-check-label" for="inlineRadio51">
                    Married
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions1"
                    id="inlineRadio61"
                    value="divorced"
                    checked={maritalStatus === "divorced"}
                    onChange={() => setMaritalStatus("divorced")}
                  />
                  <label class="form-check-label" for="inlineRadio61">
                    Divorced
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions1"
                    id="inlineRadio71"
                    value="widowed"
                    checked={maritalStatus === "widowed"}
                    onChange={() => setMaritalStatus("widowed")}
                  />
                  <label class="form-check-label" for="inlineRadio71">
                    Widowed
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="form-group col-md-3">
              <label for="place">Residential Address</label>
              <input
                type="text"
                className="form-control"
                id="place"
                placeholder="Enter Your Residential Address"
                required
                value={residentialAddress}
                onChange={(e) => setResidentialAddress(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3">
              <label for="state">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                placeholder="Enter Your State"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3">
              <label for="country">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                placeholder="Enter Your Country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3">
              <label for="pincode">Pincode</label>
              <input
                type="tel"
                className="form-control"
                id="pincode"
                placeholder="Enter Your Pincode"
                required
                pattern="[0-9]{6}"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
          </div>
          <div class="mt-2 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="same"
              onChange={() => setPermanentAddressSame(!isPermanentAddressSame)}
              required
            />
            <label class="form-check-label" for="same">
              Check Permanent Address are same
            </label>
          </div>
          <button type="submit" className="btn btn-primary mt-2 mb-4">
            Save
          </button>
        </form>
        <div
          style={
            personalDetails && personalDetails.length === 0
              ? { display: "none" }
              : { display: "block" }
          }
        >
          <table className="table mt-3 mb-3">
            <thead>
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">First Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone No</th>
                <th className="p-3"> Date Of Birth</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Marital Status</th>
                <th className="p-3">State</th>
                <th className="p-3">Country</th>
                <th className="p-3"> Pincode</th>
              </tr>
            </thead>
            <tbody>
              {personalDetails &&
                personalDetails.map((personal, index) => (
                  <tr key={personal._id}>
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{personal.firstName}</td>
                    <td className="p-3">{personal.email}</td>
                    <td className="p-3">{personal.phone}</td>
                    <td className="p-3">
                      {personal.dob
                        ? new Date(personal.dob).toISOString().substring(0, 10)
                        : "Not Provided"}
                    </td>
                    <td className="p-3">{personal.gender}</td>
                    <td className="p-3">{personal.maritalStatus}</td>
                    <td className="p-3">{personal.state}</td>
                    <td className="p-3">{personal.country}</td>
                    <td className="p-3">{personal.pincode}</td>
                    {/* Add more table cells if needed */}
                  </tr>
                ))}
            </tbody>
          </table>
          <button
            className="btn btn-warning mt-2 mb-2 text-white"
            onClick={handleEmployee}
          >
            Next
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default PersonalInformation;
