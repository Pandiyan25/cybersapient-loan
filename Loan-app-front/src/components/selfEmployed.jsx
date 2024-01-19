import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiURI } from "./config";
function SelfEmployed() {
  const [itr1File, setItr1File] = useState(null);
  const [pAndFFile, setPAndFFile] = useState(null);
  const [businessRegistrationFile, setBusinessRegistrationFile] =
    useState(null);
  const [bStatementFile, setBStatementFile] = useState(null);
  const [ownershipFile, setOwnershipFile] = useState(null);
  const itrRef1 = useRef(null);
  const pfRef = useRef(null);
  const businessProofRef = useRef(null);
  const bankRef = useRef(null);
  const ownershipRef = useRef(null);
  const [userID, setuserId] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setuserId(localStorage.getItem("userID"));
  }, []);

  const selfEmp = async (e) => {
    e.preventDefault();

    console.log(
      itr1File,
      pAndFFile,
      businessRegistrationFile,
      bStatementFile,
      ownershipFile
    );
    setLoading(true);
    await fetch(apiURI.URL + "api/employment/document/selfemployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        incomeTaxReturns: itr1File,
        profitLossStatement: pAndFFile,
        businessRegistrationDocuments: businessRegistrationFile,
        bankStatement: bStatementFile,
        businessOwnership: ownershipFile,
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
        } else if (data.message === "Self Employee Proof Created Successfull") {
          toast.success("Self Employee Details are saved", {
            position: "top-right",
            autoClose: 3000,
          });
          itrRef1.current.value = "";
          pfRef.current.value = "";
          businessProofRef.current.value = "";
          bankRef.current.value = "";
          ownershipRef.current.value = "";
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
      toast.error("Income Tax Returns should be PDF!", {
        position: "top-right",
        autoClose: 3000,
      });
      if (itrRef1.current) {
        itrRef1.current.value = "";
      }
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setItr1File(reader.result);
      };
    }
  };

  const handlepfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Profit and Loss should be PDF!", {
        position: "top-right",
        autoClose: 3000,
      });
      if (pfRef.current) {
        pfRef.current.value = "";
      }
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPAndFFile(reader.result);
      };
    }
  };

  const handlebusinessChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Business Registration should be PDF!", {
        position: "top-right",
        autoClose: 3000,
      });
      if (businessProofRef.current) {
        businessProofRef.current.value = "";
      }
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBusinessRegistrationFile(reader.result);
      };
    }
  };

  const handlebankChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Bank statement should be PDF!", {
        position: "top-right",
        autoClose: 3000,
      });
      if (bankRef.current) {
        bankRef.current.value = "";
      }
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBStatementFile(reader.result);
      };
    }
  };

  const handleownershipChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Business Ownership should be PDF!", {
        position: "top-right",
        autoClose: 3000,
      });
      if (ownershipRef.current) {
        ownershipRef.current.value = "";
      }
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setOwnershipFile(reader.result);
      };
    }
  };

  return (
    <div className="container">
      <h4 className="text-center">Income Proof</h4>
      <form onSubmit={selfEmp}>
        <div className="row">
          <div className="form-group col-md-6">
            <label for="itr1">
              Income Tax Returns (ITR) for the last 2 to 3 years
            </label>
            <input
              type="file"
              className="form-control"
              id="itr1"
              onChange={handleFileChange}
              ref={itrRef1}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label for="p&f">Profit and Loss Statement</label>
            <input
              type="file"
              className="form-control"
              id="p&f"
              onChange={handlepfChange}
              ref={pfRef}
              required
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="form-group col-md-6">
            <label for="businessRegistration">
              Business registration documents
            </label>
            <input
              type="file"
              className="form-control"
              id="businessRegistration"
              onChange={handlebusinessChange}
              ref={businessProofRef}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label for="bStatement">
              Bank statements for the last 3 to 6 months
            </label>
            <input
              type="file"
              className="form-control"
              id="bStatement"
              onChange={handlebankChange}
              ref={bankRef}
              required
            />
          </div>
        </div>
        <h4 className="text-center mt-2">Ownership Proof </h4>
        <div className="row mt-2">
          <div className="form-group col-md-6">
            <label for="ownership">
              Business ownership documents Certificate of Practice (for
              professionals)
            </label>
            <input
              type="file"
              className="form-control"
              id="ownership"
              onChange={handleownershipChange}
              ref={ownershipRef}
              required
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary mt-2" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default SelfEmployed;
