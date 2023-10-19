import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/wallet");
    }, 5000);
  }, [navigate]);

  return (
    <div>
      <h1>Payment Successful 🎉</h1>
      <p>You will be redirect in 5 seconds</p>
    </div>
  );
};

export default Success;
