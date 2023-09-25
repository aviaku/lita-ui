import Nav from "../../components/headerNoAuth";
import Footer from "../../components/footer/Index";
import Header from "../../components/header";

function PrivacyPolicyPage() {
  return (
    <div className="bg-gradient-to-b from-blue-400 to-purple-500 min-h-screen text-white py-16">
      {/* <Nav /> */}
      <Header />
      <div className="max-w-3xl mx-auto mt-12 mb-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

        <div className="border border-white rounded-lg p-6 shadow-md bg-white bg-opacity-10">
          <p className="text-gray-200">
            Your privacy is our top priority at ItemSwap. We are
            committed to protecting your personal information and ensuring a
            safe and secure gaming environment. Our Privacy Policy outlines the
            measures we take to safeguard your data and details how we collect,
            use, and store your information. Rest assured that your privacy is
            respected at all times.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicyPage;
