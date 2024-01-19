import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiURI } from "./config";
function Salaired() {
  const [itrFile, setItrFile] = useState(null);
  const [selectedLoanDetail, setSelectedLoanDetail] = useState("");
  const [bankStatementFile, setBankStatementFile] = useState(null);
  const [eProofFile, setEProofFile] = useState(null);
  const [employmentId, setEmploymentId] = useState("");
  const [appointmentLetterFile, setAppointmentLetterFile] = useState(null);
  const [currentEmploymentFile, setCurrentEmploymentFile] = useState(null);
  const [userID, setuserId] = useState("");
  const itrRef = useRef(null);
  const bankStatementRef = useRef(null);
  const employeeProofRef = useRef(null);
  const appointmentLetterRef = useRef(null);
  const currentEmployeeRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setuserId(localStorage.getItem("userID"));
    console.log(userID);
  }, []);

  const salary = async (e) => {
    e.preventDefault();
    console.log(
      itrFile,
      bankStatementFile,
      eProofFile,
      appointmentLetterFile,
      currentEmploymentFile
    );
    setLoading(true);
    await fetch(apiURI.URL + "api/employment/document/salary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        annualIncomeProof: itrFile,
        loanType: selectedLoanDetail,
        bankStatement: bankStatementFile,
        employmentProof: eProofFile,
        idCard: employmentId,
        appointmentLetter: appointmentLetterFile,
        currentEmploymentProof: currentEmploymentFile,
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
        if (data.message === "Failed to update") {
          alert("Failed to update document details");
        } else if (data.message === "Salary Proof Created Successfull") {
          toast.success("Salary Details are saved", {
            position: "top-right",
            autoClose: 3000,
          });
          itrRef.current.value = "";
          bankStatementRef.current.value = "";
          appointmentLetterRef.current.value = "";
          employeeProofRef.current.value = "";
          currentEmployeeRef.current.value = "";
          setEmploymentId("");
          setSelectedLoanDetail("");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Annual Income Tax should be PDF!", {
        position: "top-right",
        autoClose: 3000,
      });
      if (itrRef.current) {
        itrRef.current.value = "";
      }
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setItrFile(reader.result);
      };
    }
    console.log(itrFile);
  };

  const handlebankfile = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Bank statement should be PDF!", {
        position: "top-right",
        autoClose: 3000,
      });
      if (bankStatementRef.current) {
        bankStatementRef.current.value = "";
      }
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBankStatementFile(reader.result);
      };
    }
  };
  const handleEprooffile = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Employee Proof should be PDF!", {
        position: "top-right",
        autoClose: 3000,
      });
      if (employeeProofRef.current) {
        employeeProofRef.current.value = "";
      }
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setEProofFile(reader.result);
      };
    }
  };
  const handleappointmentfile = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Appointment letter should be PDF!", {
        position: "top-right",
        autoClose: 3000,
      });
      if (appointmentLetterRef.current) {
        appointmentLetterRef.current.value = "";
      }
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAppointmentLetterFile(reader.result);
      };
    }
  };
  const handlecurrentEmployeefile = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Current employment proof should be PDF!", {
        position: "top-right",
        autoClose: 3000,
      });
      if (currentEmployeeRef.current) {
        currentEmployeeRef.current.value = "";
      }
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCurrentEmploymentFile(reader.result);
      };
    }
  };
  return (
    <div className="container">
      <h4 className="text-center">Income Proof</h4>
      <form onSubmit={salary}>
        <div className="row">
          <div className="form-group col-md-6">
            <label for="itr">
              Annual Income Tax Returns (ITR) for the Last 2 Years
            </label>
            <input
              type="file"
              className="form-control"
              id="itr"
              required
              onChange={handleFileChange}
              ref={itrRef}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="loans">Details of Other Loans (if any)</label>
            <select
              className="form-control"
              id="loans"
              required
              value={selectedLoanDetail}
              onChange={(e) => {
                setSelectedLoanDetail(e.target.value);
              }}
            >
              <option value="">Select Any One</option>
              <option value="loan">Type of Loan </option>
              <option value="emi">EMI Amount</option>
              <option value="outsatndingamount">Outstanding Amount</option>
            </select>
          </div>
        </div>
        <div className="row mt-2">
          <div className="form-group col-md-6">
            <label for="bankStatement">
              Bank Statements for the Last 6 Months
            </label>
            <input
              type="file"
              className="form-control"
              id="bankStatement"
              required
              onChange={handlebankfile}
              ref={bankStatementRef}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="eproof">
              Employment Proof for Salaried Individuals:
            </label>
            <input
              type="file"
              className="form-control"
              id="eproof"
              required
              onChange={handleEprooffile}
              ref={employeeProofRef}
            />
          </div>
        </div>
        <h4 className="text-center mt-2">Employment Proof</h4>
        <div className="row mt-2">
          <div className="form-group col-md-4">
            <label for="emId">Employment ID card</label>
            <input
              type="number"
              className="form-control"
              id="emId"
              placeholder="Enter Your Employment ID card"
              required
              value={employmentId}
              onChange={(e) => {
                setEmploymentId(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-md-4">
            <label for="appointmentLetter">Appointment letter</label>
            <input
              type="file"
              className="form-control"
              id="appointmentLetter"
              required
              onChange={handleappointmentfile}
              ref={appointmentLetterRef}
            />
          </div>
          <div className="form-group col-md-4">
            <label for="currentEmployement">Current employment proof</label>
            <input
              type="file"
              className="form-control"
              id="currentEmployement"
              required
              onChange={handlecurrentEmployeefile}
              ref={currentEmployeeRef}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default Salaired;
