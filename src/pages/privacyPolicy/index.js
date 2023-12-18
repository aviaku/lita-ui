import Nav from "../../components/headerNoAuth";
import Footer from "../../components/footer/Index";
import Header from "../../components/header";

function PrivacyPolicyPage() {
  return (
    <div className="">
      {/* <Nav /> */}
      <Header />
      <br />
      <div className="max-w-3xl mx-auto mt-12 mb-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

        <div className="border border-white rounded-lg p-6 shadow-md bg-white bg-opacity-10 text-gray-900">
          <div class="container mx-auto p-4">
            <h1 class="text-3xl font-bold mb-4">PRIVACY POLICY</h1>

            <p class="mb-4">
              Welcome to ItemSwap. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your personal information when you
              visit our website.
            </p>

            <h2 class="text-xl font-semibold mb-2">
              2. Information We Collect
            </h2>

            <ul class="list-disc pl-8 mb-4">
              <li>
                <span class="font-semibold">a. Personal Information:</span> We
                may collect personal information, such as your name, email
                address, and other contact details when you voluntarily provide
                them to us.
              </li>
              <li>
                <span class="font-semibold">
                  b. Automatically Collected Information:
                </span>{" "}
                We may automatically collect certain information about your
                device, including your IP address, browser type, and operating
                system.
              </li>
            </ul>

            <h2 class="text-xl font-semibold mb-2">
              3. How We Use Your Information
            </h2>

            <ul class="list-disc pl-8 mb-4">
              <li>
                <span class="font-semibold">
                  a. Providing and maintaining our website.
                </span>
              </li>
              <li>
                <span class="font-semibold">
                  b. Personalizing your experience.
                </span>
              </li>
              <li>
                <span class="font-semibold">
                  c. Communicating with you about our products and services.
                </span>
              </li>
            </ul>

            <h2 class="text-xl font-semibold mb-2">
              4. Cookies and Similar Technologies
            </h2>

            <p class="mb-4">
              We use cookies and similar technologies to enhance your experience
              on our website. You can manage your cookie preferences through
              your browser settings.
            </p>

            <h2 class="text-xl font-semibold mb-2">5. Third-Party Links</h2>

            <p class="mb-4">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these
              third-party sites.
            </p>

            {/* <p class="mt-8 text-sm text-gray-600">Last updated: [Date]</p> */}

            <h2 class="text-xl font-semibold mt-8 mb-2">10. Contact Us</h2>

            <p class="mb-4">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at{" "}
              <a href="mailto:support@itemswap.com" class="text-blue-500">
                support@itemswap.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicyPage;
