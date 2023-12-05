import { useCallback, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Nav from "../../components/headerNoAuth";
import { useSelector } from "react-redux";
import Web3 from "web3";
import { contractABI } from "../../config/contractABI";

const Wallet = ({ depositAmount }) => {
  const [Razorpay, isLoaded] = useRazorpay();

  const [userAddress, setUserAddress] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [tokenAdded, setTokenAdded] = useState(false);
  const [error, setError] = useState("");
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState(null);

  const contractAddress = "0xf28B53320913F500c0C28fd3b64b505015791245";
  const tokenAddress = "0xf28B53320913F500c0C28fd3b64b505015791245";

  const handlePayment = useCallback(async () => {
    // const order = await createOrder(params); //order id return from backend

    const options = {
      key: "rzp_test_piel1ajBKfxi1A",
      amount: parseInt(depositAmount) * 100,
      currency: "INR",
      // name: "Acme Corp",
      // description: "Test Transaction",
      // image: "https://example.com/your_logo",
      // order_id: order.id, //order id from backend
      handler: (res) => {
        console.log(res);
      },
      // prefill: {
      //   name: "Piyush Garg",
      //   email: "youremail@example.com",
      //   contact: "9999999999",
      // },
      // notes: {
      //   address: "Razorpay Corporate Office",
      // },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay, depositAmount]);

  // useEffect(() => {
  //   if (isLoaded) {
  //     handlePayment();
  //   }
  // }, [isLoaded, handlePayment]);

  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.amount.value);
  //   navigate("/payment", { state: { amount: amount } });
  // };

  // Fetch transaction history
  const fetchTransactionHistory = async () => {
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
      setTransactionHistory(res.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const isTokenAdded = async () => {
    // Request account access
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Check if the token is already added to MetaMask
    const isTokenAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: contractAddress,
          symbol: "ITST", // Provide the correct symbol
          decimals: 18, // Provide the correct decimals
        },
      },
    });

    if (isTokenAdded) {
      return setTokenAdded(true);
    }
    // // Check if the token is already added
    // const isTokenAdded = addedTokens.some(
    //   (token) => token.address.toLowerCase() === tokenAddress.toLowerCase()
    // );

    // if (isTokenAdded) {
    //   return setTokenAdded(true);
    //   alert("Token is already added to MetaMask");
    // }
  };

  const handleAddToken = async () => {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      alert("Please install MetaMask to use this feature");
      return;
    }

    try {
      // Request account access
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Add token to MetaMask
      const tokenSymbol = "ITST";
      const tokenDecimals = 18;
      const tokenImage =
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcryptologos.cc%2Fenergy-web-token&psig=AOvVaw02V9lZ9qbAyWviKZBEuo9T&ust=1700369134531000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCX6OPezIIDFQAAAAAdAAAAABAR";

      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding token to MetaMask. Please try again.");
    }
  };

  // const transferCustomToken = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const web3 = new Web3(window.ethereum);

  //     // Instantiate the ERC20 contract object
  //     const contract = new web3.eth.Contract(contractABI, contractAddress);

  //     // Get the balance of the custom token from the sender's account
  //     const senderBalance = await contract.methods
  //       .balanceOf(userAddress)
  //       .call();

  //     // Check if the sender has enough balance to transfer the tokens
  //     if (senderBalance < amount) {
  //       console.log("Insufficient balance");
  //       setError("Insufficient balance");
  //       return;
  //     }
  //     console.log(senderBalance, amount);

  //     // Send the custom tokens from the sender's account to the recipient's account
  //     const transfer = await contract.methods
  //       .transfer("0xfbe6f99D39FE5826Dac948bD046BbDB4e2624643", amount)
  //       .send({ from: userAddress });
  //     console.log("Transfer:", transfer);
  //     if (transfer.blockHash) {
  //       try {
  //         const res = await axios.post(
  //           `${process.env.REACT_APP_BACKEND_URL}/addBalance`,
  //           {
  //             userId: user.id,
  //             amount: parseInt(amount) / 1000000000000000000,
  //             transactionId: transfer.blockHash,
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${user.token}`,
  //             },
  //           }
  //         );
  //         console.log(res.data);
  //         if (res.status === 200) {
  //           navigate("/success");
  //         }
  //       } catch (error) {}
  //     }
  //     // Update the state of the component to reflect the transfer
  //     // ...
  //   } catch (err) {
  //     console.log(err);
  //     setError(err.message);
  //   }
  // };

  const transferCustomToken = async (e) => {
    e.preventDefault();
    // if (window.innerWidth < 768) {
    const options = {
      from: account, // The user's active address.
      to: "0xfbe6f99D39FE5826Dac948bD046BbDB4e2624643", // Required except during contract publications.
      value: amount.toString(), // Only required to send ether to the recipient from the initiating external account.
      gasLimit: "0x5028", // Customizable by the user during MetaMask confirmation.
      maxPriorityFeePerGas: "0x3b9aca00", // Customizable by the user during MetaMask confirmation.
      maxFeePerGas: "0x2540be400", // Customizable by the user during MetaMask confirmation.
    };

    console.log("Sending transaction with options:", options);

    window.ethereum
      .request({
        method: "eth_sendTransaction",
        // The following sends an EIP-1559 transaction. Legacy transactions are also supported.
        params: [options],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error(error));
    // } else {
    //   if (web3) {
    //     try {
    //       // Get the selected account from MetaMask
    //       const accounts = await web3.eth.getAccounts();
    //       const fromAddress = accounts[0];

    //       // Transfer ETH
    //       await web3.eth.sendTransaction({
    //         from: fromAddress,
    //         to: "0xfbe6f99D39FE5826Dac948bD046BbDB4e2624643",
    //         value: web3.utils.toWei(amount, "ether"),
    //       });

    //       console.log(
    //         `Successfully transferred ${amount} ETH to ${"0xfbe6f99D39FE5826Dac948bD046BbDB4e2624643"}`
    //       );
    //     } catch (error) {
    //       console.error("Error transferring ETH:", error);
    //     }
    //   } else {
    //     console.error("Web3 not initialized");
    //   }
    // }
  };

  useEffect(() => {
    const initWeb3 = async () => {
      // if (window.innerWidth >= 768) {
      //   if (window.ethereum) {
      //     try {
      //       // Request account access if needed
      //       await window.ethereum.request({ method: "eth_requestAccounts" });

      //       // Use MetaMask's provider
      //       const provider = new Web3(window.ethereum);
      //       setWeb3(provider);
      //       console.log(provider);
      //     } catch (error) {
      //       console.error("Error connecting to MetaMask:", error);
      //     }
      //   } else {
      //     console.error("MetaMask not detected!");
      //   }
      // } else {
      if (window.ethereum) {
        console.log("MetaMask installed!");
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log(accounts);
          setUserAddress(accounts[0]);
          setAccount(accounts[0]);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        console.error(
          "MetaMask not found. Please install it to use this feature."
        );
      }
      // }
    };

    initWeb3();
  }, []);

  const connect = async () => {
    console.log("connect");
    if (window.ethereum) {
      console.log("MetaMask installed!");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setUserAddress(accounts[0]);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error(
        "MetaMask not found. Please install it to use this feature."
      );
    }
  };

  // useEffect(() => {
  //   const switchNetwork = async (newChainId) => {
  //     try {
  //       await window.ethereum.request({
  //         method: "wallet_switchEthereumChain",
  //         params: [{ chainId: `0x${newChainId.toString(16)}` }],
  //       });
  //     } catch (error) {
  //       console.error("Error switching network:", error);
  //     }
  //   };

  //   switchNetwork(80001);
  // }, [userAddress]);

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  useEffect(() => {
    // isTokenAdded();
    // Function to get user's Ethereum address
    const getUserAddress = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setUserAddress(accounts[0]);
        } catch (error) {
          console.error("Error fetching user address:", error);
        }
      }
    };

    // Function to get user's token balance
    const getTokenBalance = async () => {
      if (userAddress) {
        const web3 = new Web3(window.ethereum);

        // Create contract instance
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        try {
          const balance = await contract.methods.balanceOf(userAddress).call();
          console.log(
            "Token balance:",
            (balance / 1000000000000000000n).toString()
          );
          setTokenBalance((balance / 1000000000000000000n).toString());
        } catch (error) {
          console.error("Error fetching token balance:", error);
        }
      }
    };

    getUserAddress();
    getTokenBalance();
  }, [userAddress]);

  return (
    <div>
      {/* <Nav /> */}
      <Header />
      <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 class="text-2xl font-semibold mb-4">My Wallet</h2>
          <div className="flex justify-between">
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Balance</h3>
              {tokenBalance && <p>{user.balance} ITST</p>}
            </div>
            <Link to="/withdrawal">
              <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                Withdraw Money
              </button>
            </Link>
          </div>
          {userAddress && <p>Wallet Address: {userAddress}</p>}
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Recent Transactions</h3>
            <ul class="divide-y divide-gray-300">
              {transactionHistory.slice(0, 5).map((transaction) => (
                <li class="py-2">
                  <span class="text-gray-600">
                    Received from {transaction?.transactionId}
                  </span>
                  <span class="text-green-600 float-right">
                    + {transaction?.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={isTokenAdded}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            List ITST into Metamask
          </button>
          <button onClick={connect}>Connect</button>
          <br />
          <br />
          <form onSubmit={transferCustomToken}>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              onChange={(e) => setAmount(Number(e.target.value))}
              className="input input-bordered w-full max-w-xs"
              required
            />
            <br />
            <br />
            <p>{amount.toString()}</p>
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              // onClick={handlePayment}
            >
              Add Funds
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
