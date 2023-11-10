// src/components/WithdrawalHistory.js

import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import axios from "axios";
import { useSelector } from "react-redux";

const WithdrawalHistory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [userWithdrawalData, setUserWithdrawalData] = useState([]);

  // Fetch withdrawal history from backend
  const fetchWithdrawalHistory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user-withdrawals/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserWithdrawalData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWithdrawalHistory();
  }, []);

  const withdrawalData = [
    { id: "123456", amount: "$500", date: "2023-11-01" },
    { id: "789012", amount: "$300", date: "2023-11-05" },
    // Add more data as needed
  ];

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-teal-700">
          Withdrawal History
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 text-gray-800 border border-gray-300 shadow-lg rounded-md overflow-hidden">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="py-2 px-4 border-b">Transaction ID</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {userWithdrawalData.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="py-2 px-4 border-b font-semibold">
                    {transaction.transactionId}
                  </td>
                  <td className="py-2 px-4 border-b">
                    ${transaction.withdrawalAmount}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {transaction.processedAt}
                  </td>
                  <td className="py-2 px-4 border-b">{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WithdrawalHistory;
