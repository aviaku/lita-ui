import { useCallback, useEffect } from "react";
import useRazorpay from "react-razorpay";
import Header from "../../components/header";
import Nav from "../../components/headerNoAuth";
import { useSelector } from "react-redux";

const Wallet = () => {
  const [Razorpay, isLoaded] = useRazorpay();

  const handlePayment = useCallback(async () => {
    // const order = await createOrder(params); //order id return from backend

    const options = {
      key: "rzp_test_piel1ajBKfxi1A",
      amount: "3000",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      // order_id: order.id, //order id from backend
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  // useEffect(() => {
  //   if (isLoaded) {
  //     handlePayment();
  //   }
  // }, [isLoaded, handlePayment]);

    const { user } = useSelector((state) => ({ ...state }));

    return (
      <div>
        {/* <Nav /> */}
        <Header />
        <div class="min-h-screen flex items-center justify-center">
          <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h2 class="text-2xl font-semibold mb-4">My Wallet</h2>
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Balance</h3>
              <p class="text-gray-600">INR {user.balance}</p>
            </div>
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Recent Transactions</h3>
              <ul class="divide-y divide-gray-300">
                <li class="py-2">
                  <span class="text-gray-600">Received from John Doe</span>
                  <span class="text-green-600 float-right">+ $500.00</span>
                </li>
                <li class="py-2">
                  <span class="text-gray-600">Sent to Jane Smith</span>
                  <span class="text-red-600 float-right">- $200.00</span>
                </li>
                <li class="py-2">
                  <span class="text-gray-600">Received from Alice Johnson</span>
                  <span class="text-green-600 float-right">+ $1000.00</span>
                </li>
              </ul>
            </div>
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handlePayment}
            >
              Add Funds
            </button>
          </div>
        </div>
      </div>
    );
}

export default Wallet;