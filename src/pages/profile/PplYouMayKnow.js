import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Dots } from "../../svg";
import { stories } from "../../data/home";
import AddFriendSmallCard from "./AddFriendSmallCard";
export default function PplYouMayKnow() {

  const apiEndpoint = process.env.REACT_APP_BACKEND_URL;
  const { user } = useSelector((state) => ({ ...state }));
  const [myGames, setMyGames] = useState(false);
  
  const userGames = async () => {
    try {
      const res = await axios.get(`${apiEndpoint}/gamers/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log('xxxxxxxxxxxxx', res.data);
      setMyGames(res.data);
    } catch (error) {
      console.log("🚀 ~ file: index.js:26 ~ gameList ~ error:", error);
    }
  };

  useEffect(() => {
    userGames();
  }, []);

  return (
    <div className="pplumayknow">
      <div className="pplumayknow_header">
        Games played
        {/* <div className="post_header_right ppl_circle hover1">
          <Dots />
        </div> */}
      </div>
      <div className="pplumayknow_list">
        {myGames && myGames.map((item, i) => (
          <AddFriendSmallCard item={item.game} key={i} />
        ))}
      </div>
    </div>
  );
}
