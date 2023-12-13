import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../../components/header";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  //   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => ({ ...state }));

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getTransactionLogs`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(res.data.transactions);
      setTransactions(res.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  //   if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error occured: {error.message}</div>;

  return (
    <>
      <br />
      <br />
      <Header />
      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
        <ul className="bg-white shadow-md rounded-md overflow-hidden">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="border-b border-gray-200 last:border-b-0 px-4 py-3 flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800">{transaction?.transactionId}</p>
              </div>
              <div
                className={
                  transaction.amount < 0 ? "text-red-500" : "text-green-500"
                }
              >
                {transaction.amount < 0 ? "-" : "+"}$
                {Math.abs(transaction.amount).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TransactionHistory;
