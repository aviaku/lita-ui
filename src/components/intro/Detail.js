import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Bio from "./Bio";
import Games from "./Games";

export default function Detail({
  img,
  value,
  placeholder,
  name,
  handleChange,
  updateDetails,
  infos,
  text,
  rel,
  games,
  gamesPlayed,
}) {
  const apiEndpoint = process.env.REACT_APP_BACKEND_URL;
  const [show, setShow] = useState(false);
  const [myGames, setMyGames] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const userGames = async () => {
    try {
      const res = await axios.get(`${apiEndpoint}/gamers/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setMyGames(res.data);
    } catch (error) {
      console.log("🚀 ~ file: index.js:26 ~ gameList ~ error:", error);
    }
  };

  useEffect(() => {
    userGames();
  }, []);

  return (
    <div>
      <div className="add_details_flex " onClick={() => setShow(true)}>
        {value ? (
          <div className="info_profile ">
            <img src={`../../../icons/${img}.png`} alt="" />
            {games ? (
              <p>
                {myGames &&
                  myGames.map((game) => <span>{game.game.name},</span>)}
              </p>
            ) : (
              value
            )}
            <i className="edit_icon"></i>
          </div>
        ) : (
          <>
            <i className="rounded_plus_icon"></i>
            <span className="underline">Add {text}</span>
          </>
        )}
      </div>
      {show &&
        (games ? (
          <Games
            placeholder={placeholder}
            name={name}
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            detail
            setShow={setShow}
            gamesPlayed={gamesPlayed}
            rel={rel}
            games={games}
          />
        ) : (
          <Bio
            placeholder={placeholder}
            name={name}
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            detail
            setShow={setShow}
            rel={rel}
          />
        ))}
    </div>
  );
}
