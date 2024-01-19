import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiURI } from "./config";
function Employment() {
  const [occupation, setOccupation] = useState("salaried");
  const [employeName, setEmployeName] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [userID, setuserId] = useState("");
  const [employmentDet, setEmploymentDet] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("occupation", occupation);
    const storedUserId = localStorage.getItem("userID");
    setuserId(storedUserId);

    if (!storedUserId || storedUserId === "") {
      navigate("/");
    } else {
      getEmployment();
    }
  }, [userID, occupation]);

  const handleClick = () => {
    navigate("/documentCollection");
  };

  const handlePrev = () => {
    navigate("/loan");
  };

  const employementSubmit = async (e) => {
    e.preventDefault();
    console.log(
      occupation,
      employeName,
      officialEmail,
      yearsOfExperience,
      monthlyIncome,
      employmentType
    );

    await fetch(apiURI.URL + "api/employment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        occupation: occupation,
        employeName: employeName,
        officialEmail: officialEmail,
        yearsOfExperience: yearsOfExperience,
        monthlyIncome: monthlyIncome,
        employmentType: employmentType,
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
        if (data.message === "Failed to add the Employment details") {
          alert("Failed to add the loan details");
        } else if (data.message === "Employment Created Successfull") {
          toast.success("Employment Details are saved", {
            position: "top-right",
            autoClose: 3000,
          });
          setEmployeName("");
          setOfficialEmail("");
          setYearsOfExperience("");
          setMonthlyIncome("");
          setEmploymentType("");
          getEmployment();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getEmployment = async () => {
    const user = await localStorage.getItem("userID");
    try {
      await fetch(apiURI.URL + `api/employment/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "success") {
            setEmploymentDet(data.data);
            console.log(employmentDet, "setEmploymentDet");
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <>
      <div className="container">
        <h3>Employement Information</h3>
        <form onSubmit={employementSubmit}>
          <div className="row">
            <div className="form-group col-md-6">
              <label for="occupation">Occupation</label>
              <select
                class="form-control"
                id="occupation"
                onChange={(e) => {
                  setOccupation(e.target.value);
                }}
                value={occupation}
                required
              >
                <option value="salaried">Salaried</option>
                <option value="selfemployee">Self-employed</option>
                <option value="businessowner"> Business Owner</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label for="ename">Employer Name</label>
              <input
                type="text"
                className="form-control"
                id="ename"
                placeholder="Enter Your Employer Name"
                value={employeName}
                onChange={(e) => setEmployeName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="form-group col-md-6">
              <label for="Femail">Official Email</label>
              <input
                type="email"
                className="form-control"
                id="Femail"
                placeholder="Enter Your Email"
                required
                value={officialEmail}
                onChange={(e) => setOfficialEmail(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="experience">Years of experience</label>
              <input
                type="number"
                className="form-control"
                id="phonexperiencee"
                placeholder="Years of experience"
                required
                min="1"
                max="10"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="form-group col-md-6">
              <label for="income">Monthly Income (Net)</label>
              <input
                type="number"
                className="form-control"
                id="income"
                placeholder="Income"
                required
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label style={{ width: "100%" }}>Employment Type</label>
              <div className="mt-1">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio01"
                    value="permanent"
                    required
                    checked={employmentType === "permanent"}
                    onChange={() => setEmploymentType("permanent")}
                  />
                  <label class="form-check-label" for="inlineRadio01">
                    Permanent
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio02"
                    value="contract"
                    checked={employmentType === "contract"}
                    onChange={() => setEmploymentType("contract")}
                  />
                  <label class="form-check-label" for="inlineRadio02">
                    Contract
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio03"
                    value="self-Employed"
                    checked={employmentType === "self-Employed"}
                    onChange={() => setEmploymentType("self-Employed")}
                  />
                  <label class="form-check-label" for="inlineRadio03">
                    Self-Employed
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Save
          </button>

          <button
            type="button"
            className="btn btn-warning mt-2 float-end text-white"
            onClick={handleClick}
          >
            Next
          </button>
          <button
            type="button"
            className="btn btn-danger mt-2  float-end text-white"
            onClick={handlePrev}
          >
            Previous
          </button>
        </form>
        <table
          className="table mt-3 mb-3"
          style={
            employmentDet && employmentDet.length === 0
              ? { display: "none" }
              : { display: "block" }
          }
        >
          <thead>
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Occupation</th>
              <th className="p-3">Employer Name</th>
              <th className="p-3">Official Email</th>
              <th className="p-3">Years of experience</th>
              <th className="p-3">Monthly Income</th>
              <th className="p-3">Employment Type</th>
            </tr>
          </thead>
          <tbody>
            {employmentDet &&
              employmentDet.map((emp, index) => (
                <tr key={emp._id}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{emp.occupation}</td>
                  <td className="p-3">{emp.employeName}</td>
                  <td className="p-3">{emp.officialEmail}</td>
                  <td className="p-3">{emp.yearsOfExperience}</td>
                  <td className="p-3">{emp.monthlyIncome}</td>
                  <td className="p-3">{emp.employmentType}</td>
                  {/* Add more table cells if needed */}
                </tr>
              ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </>
  );
}

export default Employment;
