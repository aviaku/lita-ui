import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import axios from "axios";
import { useSelector } from "react-redux";

const Withdrawal = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [balance, setBalance] = useState(1000);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    setBalance(user.balance);
  }, [user]);

  useEffect(() => {
    // Function to get user's Ethereum address
    const getUserAddress = async () => {
      if (window.ethereum) {
        // Request account access if needed
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            const address = accounts[0];
            setWalletAddress(address);

            // Subscribe to address changes
            window.ethereum.on("accountsChanged", (newAccounts) => {
              const newAddress = newAccounts[0];
              setWalletAddress(newAddress);
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    getUserAddress();
  }, []);

  // const handleWithdrawal = async () => {
  //   const amount = parseFloat(withdrawalAmount);

  //   if (amount <= 0 || isNaN(amount)) {
  //     setValidationMessage("Please enter a valid withdrawal amount.");
  //   } else if (amount > balance) {
  //     setValidationMessage("Insufficient funds!");
  //   } else {
  //     const items = {
  //       items: [
  //         {
  //           recipient_type: "EMAIL",
  //           amount: {
  //             value: withdrawalAmount, // Replace with the actual amount
  //             currency: "INR", // Replace with the actual currency code
  //           },
  //           receiver: user.email, // Replace with the recipient's email
  //           note: "Thank you.",
  //         },
  //       ],
  //     };

  //     // Withdrawal logic
  //     try {
  //       const response = await axios.post(
  //         `${process.env.REACT_APP_BACKEND_URL}/paypal/send-payout`,
  //         {
  //           items,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.token}`,
  //           },
  //         }
  //       );
  //       console.log(response);
  //       if (response.status !== 200) {
  //         setValidationMessage("Something went wrong.");
  //         return;
  //       }
  //       setBalance(balance - amount);
  //       setWithdrawalAmount("");
  //       setValidationMessage("Withdrawal request submitted successfully.");
  //     } catch (error) {
  //       console.log(error);
  //       setValidationMessage("Something went wrong.");
  //     }
  //   }
  // };

  const handleWithdrawal = async () => {
    const amount = parseFloat(withdrawalAmount);

    if (amount <= 0 || isNaN(amount)) {
      setValidationMessage("Please enter a valid withdrawal amount.");
    } else if (amount > balance) {
      setValidationMessage("Insufficient funds!");
    } else {
      // Withdrawal logic
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/request-withdrawal`,
          {
            userId: user.id,
            withdrawalAmount: parseInt(amount),
            bankDetails: user.bankDetails,
            walletAddress,
            notes,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(response);
        if (response.status !== 200) {
          setValidationMessage("Something went wrong.");
          return;
        }
        setBalance(balance - amount);
        setWithdrawalAmount("");
        setValidationMessage("Withdrawal request submitted successfully.");
      } catch (error) {
        console.log(error);
        setValidationMessage("Something went wrong.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Withdrawal Page</h1>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className=" flex justify-between mb-4">
            <div className="mb-4">
              <p className="text-lg">Available Balance:</p>
              <p className="text-2xl font-semibold">
                {balance.toFixed(2)} ITST
              </p>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
              to="/withdrawal-history"
            >
              Withdrawal History
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="walletAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Your Wallet Address:
            </label>
            <input
              type="text"
              id="walletAddress"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Wallet Address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="withdrawalAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Withdraw Amount:
            </label>
            <input
              type="number"
              id="withdrawalAmount"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter the withdrawal amount"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Note"
              name="notes"
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          {/* <p className="text-sm text-gray-500">
            * Withdrawal fee: 0.5% of the withdrawal amount
          </p> */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
            onClick={handleWithdrawal}
          >
            Withdraw
          </button>
          {validationMessage && (
            <div className="mt-4 p-2 text-red-500 bg-red-100 rounded-md">
              {validationMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
