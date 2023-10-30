import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function AllMenuItem({
  name,
  description,
  icon,
  event,
  notificationId,
}) {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/markNotificationAsRead/${notificationId}`
    );

    if (res.status === 200) {
      navigate(`/auction/${event}`);
    }
  };
  return (
    <div className="all_menu_item hover1" onClick={handleClick}>
      <img src={`../../left/events.png`} alt="" />
      <div className="all_menu_col">
        <span>{name}</span>
        <span>{description}</span>
      </div>
    </div>
  );
}
