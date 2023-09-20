import { useEffect, useState } from "react";
import Nav from "../../../../components/headerNoAuth/index";
import Footer from "../../../../components/footer/Index";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer} from "react-toastify";
import  {FaTrash} from 'react-icons/fa'
import "react-toastify/dist/ReactToastify.css";
import { toastify } from "../../../../helpers/toastify";
import Header from "../../../../components/header";

const Games = () => {
    const apiEndpoint = process.env.REACT_APP_BACKEND_URL;
  const { user } = useSelector((state) => ({ ...state }));
  const [games, setGames] = useState([]);

const handleDelete = async (_id) => {
    try {
        const res = await axios.delete(`${apiEndpoint}/deleteGame/${_id}`);
        toastify("Game deleted!");
        gameList();
    } catch (error) {
        toastify("Something went wrong!");
        
    }
}

const gameList = async () => {
  try {
    const res = await axios.get(`${apiEndpoint}/getAllGames`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log("🚀 ~ file: index.js:17 ~ games ~ res:", res);
    setGames(res.data);
  } catch (error) {
    console.log("🚀 ~ file: index.js:26 ~ gameList ~ error:", error);
  }
};

  useEffect(() => {
    gameList();
  }, [])

  return (
    <div>
      {/* <Nav /> */}
      <Header />
      <div className="relative">
        <div className="container mx-auto pt-[106px]">
          {/* Product details section */}
          {/* <SignOut /> */}
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title">Games</h2>
              <div className="card-body">
                <div className="">
                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Image</th>
                          <th>Number of Players</th>
                          <th>Action</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        {games.map((game, index) => (
                        <tr className="hover">
                          <th>{index + 1}</th>
                          <td>{game.name}</td>
                          <td>
                            <img alt={game.name} src={game.picture} className="w-[100px]" />
                          </td>
                          <td>Blue</td>
                          <td>
                            <input type="checkbox" className="toggle" name={index} checked={game.isActive} />
                          </td>
                          <td>
                            <div className="cursor-pointer" onClick={() => {handleDelete(game._id);}}>
                            <FaTrash />
                            </div>
                          </td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Games;
