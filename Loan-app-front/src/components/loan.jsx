import React, { useState, useEffect } from "react";
import PersonalInformation from "./personalInformation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { apiURI } from "./config";
function Loan() {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [interestRate, setInterestRate] = useState(1);
  const [userID, setuserId] = useState();
  const [userLoan, setUserLoan] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userID");
    setuserId(storedUserId);

    if (!storedUserId || storedUserId === "") {
      navigate("/");
    } else {
      getLoan();
    }
  }, [userID]);

  const loanDetailSubmit = async (e) => {
    e.preventDefault();
    console.log(loanAmount, loanPurpose, loanTenure, interestRate);

    if (loanAmount === "") {
      toast.error("Loan amount is mandatory !", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (loanPurpose === "") {
      toast.error("Loan purpose is mandatory !", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    const numericLoanTenure = parseFloat(loanTenure);

    if (
      isNaN(numericLoanTenure) ||
      numericLoanTenure < 1 ||
      numericLoanTenure > 10
    ) {
      toast.error(
        "Loan tenure must be a valid number between 1 and 10 years!",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }
    await fetch(apiURI.URL + "api/loan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loanAmountRequested: loanAmount,
        loanPurpose: loanPurpose,
        loanTenure: loanTenure,
        interestRate: interestRate,
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
          toast.success("Loan Details are saved", {
            position: "top-right",
            autoClose: 3000,
          });
          setLoanAmount("");
          setLoanPurpose("");
          setLoanTenure("");
          setInterestRate(1);
          getLoan();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getLoan = async () => {
    const user = await localStorage.getItem("userID");
    try {
      await fetch(apiURI.URL + `api/loan/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "success") {
            setUserLoan(data.data);
            console.log(userLoan, "userLoan");
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
        <h2>Loan Details</h2>
        <form onSubmit={loanDetailSubmit}>
          <div className="row">
            <div className="form-group col-md-6">
              <label for="loanAmountRequested">Loan Amount Requested</label>
              <input
                type="number"
                className="form-control"
                id="loanAmountRequested"
                placeholder="Loan Amount"
                onChange={(e) => setLoanAmount(e.target.value)}
                value={loanAmount}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="loanPurpose">Loan Purpose</label>
              <select
                className="form-control"
                id="loanPurpose"
                onChange={(e) => setLoanPurpose(e.target.value)}
                value={loanPurpose}
              >
                <option value="">Select Any One</option>
                <option value="medicalExpenses">Medical Expenses</option>
                <option value="education">Education</option>
                <option value="wedding">Wedding</option>
                <option value="travel">Travel</option>
                <option value="homeRenovation">Home Renovation</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="row mt-2">
            <div className="form-group col-md-6">
              <label for="loanTenureRequested">Loan Tenure Requested</label>
              <input
                type="text"
                className="form-control"
                id="loanTenureRequested"
                placeholder="Loan Tenure up to 10 years"
                onChange={(e) => setLoanTenure(e.target.value)}
                value={loanTenure}
                maxLength="2"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="interestRate" style={{ width: "100%" }}>
                Interest Rate
              </label>
              <div className="d-flex">
                <input
                  className="form-range mt-1"
                  type="range"
                  min="1"
                  max="13"
                  onChange={(e) => setInterestRate(e.target.value)}
                  value={interestRate}
                  style={{ width: "50%" }}
                />
                <p
                  className="mt-1"
                  style={{ width: "50%", marginLeft: "15px" }}
                >
                  {interestRate}%
                </p>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Save
          </button>
        </form>
        <table
          className="table mt-3 mb-3"
          style={
            userLoan && userLoan.length === 0
              ? { display: "none" }
              : { display: "block" }
          }
        >
          <thead>
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Loan Amount</th>
              <th className="p-3">Loan Purpose</th>
              <th className="p-3">Loan Tenure</th>
              <th className="p-3"> Interest Rate</th>
            </tr>
          </thead>
          <tbody>
            {userLoan &&
              userLoan.map((loan, index) => (
                <tr key={loan._id}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{loan.loanAmountRequested}</td>
                  <td className="p-3">{loan.loanPurpose}</td>
                  <td className="p-3">{loan.loanTenure}</td>
                  <td className="p-3">{loan.interestRate}%</td>
                  {/* Add more table cells if needed */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <PersonalInformation />
    </>
  );
}

export default Loan;
