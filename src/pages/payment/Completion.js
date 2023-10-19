import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Completion = (props) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get("userId");
  const amount = searchParams.get("amount");
  console.log(userId, amount);

  const storePaymentDetails = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/addBalance`,
        { userId, amount: parseInt(amount) },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        navigate("/success");
      }
    } catch (error) {}
  };

  useEffect(() => {
    storePaymentDetails();
  }, []);

  console.log("props", props);
  return <h1>Thank you! 🎉</h1>;
};

export default Completion;
