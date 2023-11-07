import React, { useState } from "react";
import Header from "../../components/header";
import axios from "axios";
import { useSelector } from "react-redux";

function Kyc() {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIFSCCode] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation logic
    if (!accountNumber.match(/^\d{12}$/)) {
      setError("Account Number should be a 12-digit numeric value.");
      return;
    }
    if (!ifscCode.match(/^[A-Za-z]{4}\d{6}$/)) {
      setError(
        "IFSC Code is invalid. It should have 4 alphabet characters followed by 6 numeric characters."
      );
      return;
    }
    if (!accountHolderName || !bankName) {
      setError("All fields are required.");
      return;
    }

    // If all validations pass, you can submit the form or perform further actions.
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/bank-details`,
        {
          userId: user.id,
          bankName,
          accountHolderName,
          accountNumber,
          ifscCode,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      setError("");
    } catch (error) {
      console.log(error);
      setError("Something went wrong.");
    }
    setError("");
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <div className="w-full max-w-sm mx-auto">
        {/* Add page title here */}
        <h1 className="text-3xl text-center">KYC Form</h1>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          {error && <p className="text-red-500 text-xs italic mb-2">{error}</p>}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="accountNumber"
            >
              Account Number
            </label>
            <input
              className={`${
                error && !accountNumber.match(/^\d{12}$/)
                  ? "border-red-500"
                  : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="accountNumber"
              type="text"
              placeholder="Account Number"
              value={accountNumber || user.bankDetails.accountNumber}
              // disabled={user.bankDetails}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="ifscCode"
            >
              IFSC Code
            </label>
            <input
              className={`${
                error && !ifscCode.match(/^[A-Za-z]{4}\d{6}$/)
                  ? "border-red-500"
                  : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="ifscCode"
              type="text"
              placeholder="IFSC Code"
              value={ifscCode || user.bankDetails.ifscCode}
              // disabled={user.bankDetails}
              onChange={(e) => setIFSCCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="accountHolderName"
            >
              Account Holder Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="accountHolderName"
              type="text"
              placeholder="Account Holder Name"
              value={accountHolderName || user.bankDetails.accountHolderName}
              // disabled={user.bankDetails}
              onChange={(e) => setAccountHolderName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bankName"
            >
              Bank Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bankName"
              type="text"
              placeholder="Bank Name"
              value={bankName || user.bankDetails.bankName}
              // disabled={user.bankDetails}
              onChange={(e) => setBankName(e.target.value)}
              required
            />
          </div>
          {!user.bankDetails && (
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default Kyc;
