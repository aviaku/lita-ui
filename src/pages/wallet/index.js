import Header from "../../components/header";
import Nav from "../../components/headerNoAuth";
import { useSelector } from "react-redux";

const Wallet = () => {

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
          <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Add Funds
          </button>
        </div>
      </div>
      </div>
    );
}

export default Wallet;