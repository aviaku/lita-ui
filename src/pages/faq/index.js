import Nav from "../../components/headerNoAuth";
import Footer from "../../components/footer/Index";
import Header from "../../components/header";

function FAQPage() {
  return (
    <div className="bg-gradient-to-b from-blue-400 to-purple-500 min-h-screen text-white py-16">
      {/* <Nav /> */}
      <Header />
      <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-4xl font-bold mb-8 text-center">FAQ</h1>

        {/* FAQ Items */}
        <div className="space-y-8">
          {/* FAQ Item 1 */}
          <div className="border border-white rounded-lg p-6 shadow-md bg-white bg-opacity-10">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Q1: How does the auction system work on ItemSwap?
            </h2>
            <p className="text-gray-200">
              A1: Our auction system allows gamers to list gaming sessions and
              let viewers bid on them. The highest bidder gets the opportunity
              to play with the streamer during the scheduled session.
            </p>
          </div>

          {/* FAQ Item 2 */}
          <div className="border border-white rounded-lg p-6 shadow-md bg-white bg-opacity-10">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Q2: Can anyone participate in the auctions?
            </h2>
            <p className="text-gray-200">
              A2: Yes, anyone can join the auctions as long as they have an
              account on ItemSwap. Simply create an account and
              start bidding.
            </p>
          </div>

          {/* FAQ Item 3 */}
          <div className="border border-white rounded-lg p-6 shadow-md bg-white bg-opacity-10">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Q3: How do I become an affiliate on the platform?
            </h2>
            <p className="text-gray-200">
              A3: Becoming an affiliate is easy. Just sign up as a streamer or
              gamer, create your profile, and list your gaming sessions for
              auction. The moderators will accept you if you reach the criteria.
            </p>
          </div>

          {/* FAQ Item 4 */}
          <div className="border border-white rounded-lg p-6 shadow-md bg-white bg-opacity-10">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Q4: Is my payment information secure on the platform?
            </h2>
            <p className="text-gray-200">
              A4: Absolutely. We use secure payment processing methods to
              protect your financial information.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FAQPage;
