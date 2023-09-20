import Footer from "../../components/footer/Index";
import Header from "../../components/header";
import Nav from "../../components/headerNoAuth";

function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-blue-400 to-purple-500 text-white">
      {/* <Nav /> */}
      <Header />
      <div className=" p-8">
        <div className="max-w-3xl mx-auto mt-24 mb-8">
          <h1 className="text-4xl font-bold mb-4">About Tailus</h1>
          <p className="text-lg mb-4">
            Welcome to Tailus, the ultimate destination for gamers who want to
            take their gaming experience to the next level! Our platform is
            designed to connect passionate gamers with their viewers and fans in
            an exciting and interactive way.
          </p>
          <p className="text-lg mb-4">
            At Tailus, we believe in the power of gaming to bring people together,
            and we've created a unique space where gamers can offer thrilling
            gaming sessions to their viewers through live auctions. Whether
            you're a streamer looking to engage with your audience in a new way
            or a gamer eager to join exciting auctions, we have you covered.
          </p>
          <p className="text-lg">
            Our mission is to create unforgettable gaming experiences while
            fostering a strong and supportive gaming community. Join us today
            and let the games begin!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage;
