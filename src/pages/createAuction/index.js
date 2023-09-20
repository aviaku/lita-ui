import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import axios from "axios";
import Nav from "../../components/headerNoAuth/index";
import Footer from "../../components/footer/Index";
import DateTimePicker from "./dateTimePicker";
import { toastify } from "../../helpers/toastify";
import {createAuctionSchema} from './createAuctionSchema'
import { ToastContainer } from "react-toastify";
import Header from "../../components/header";

const initialValues = {
  gameId: "",
  basePrice: "",
  dateTime: "",
  description: "",
};

const CreateAuction = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [dateTime, setDateTime] = useState("")
  const [games, setGames] = useState([]);

  const apiEndpoint = process.env.REACT_APP_BACKEND_URL;
  
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: createAuctionSchema,
    onSubmit: async (values, action) => {

      const getGames = await axios.get(`${apiEndpoint}/getAllGames`);

      const selectedGame = getGames.data.filter(games => games._id === values.gameId)
      console.log(
        "🚀 ~ file: index.js:45 ~ onSubmit: ~ selectedGame:",
        getGames.data, values.gameId
      );
      console.log(
        "🚀 ~ file: index.js:47 ~ onSubmit: ~ selectedGame:",
        selectedGame
      );
      

      const data = {
        ...values,
        user: user.id,
        numberOfPayers: selectedGame?.numberOfPayers || 4,
        game: values.gameId,
        gender: user.gender,
        isActive: true,
      };
      console.log("🚀 ~ file: index.js:36 ~ onSubmit: ~ values:", user)
      
        try {
          const res = await axios.post(`${apiEndpoint}/createAuction`, data, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          toastify("Auction Created!");
        } catch (error) {
          toastify(error);
        }
      action.resetForm();
    },
  });

  const handleDateChange = (date) => {
    setDateTime(date);
  };

  const gameList = async () => {
    try {
      const res = await axios.get(`${apiEndpoint}/getAllGames`);
      setGames(res.data);
    } catch (error) {
      console.log("🚀 ~ file: index.js:26 ~ gameList ~ error:", error);
    }
  };

  useEffect(() => {
    gameList();
  }, []);

  return (
    <div>
      {/* <Nav /> */}
      <Header />
      <div className=" relative">
        <div className="container mx-auto pt-[106px]">
          {/* Product details section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-start mx-6">
            <div className="p-4 col-span-2 md:col-span-1 bg-white dark:bg-dark rounded-lg outline outline-1 hover:outline-2 outline-gray-300 hover:outline-primary-500 dark:hover:outline-primary-500 dark:outline-gray-800 shadow-outline hover:shadow-hover">
              <img
                className="w-full rounded-lg"
                src="https://img.freepik.com/premium-vector/autumn-mountains-landscape-with-tree-silhouettes-river-sunset_148087-293.jpg?w=2000"
                alt="craft-image"
              />
            </div>
            {/* <SignOut /> */}
            <div className="col-span-2 md:col-span-1 mx-2">
              <form onSubmit={handleSubmit}>
                <div class="flex flex-wrap justify-between">
                  <div className="form-control w-full max-w-xs lg:w-6/12 px-2">
                    <label className="label">
                      <span className="label-text">Game</span>
                    </label>
                    <select
                      className="select select-bordered"
                      name="gameId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option disabled selected>
                        Select
                      </option>
                      {games.map(game => (
                        <option value={game._id}>{game.name}</option>
                      ))}
                    </select>
                    {errors.gameId && touched.gameId ? (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.gameId}
                        </span>
                      </label>
                    ) : null}
                  </div>
                  <div className="form-control w-full max-w-xs lg:w-6/12 px-2">
                    <label className="label">
                      <span className="label-text">Base Price</span>
                    </label>
                    <input
                      type="text"
                      placeholder="1000"
                      name="basePrice"
                      value={values.basePrice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.basePrice && touched.basePrice ? (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.basePrice}
                        </span>
                      </label>
                    ) : null}
                  </div>
                  <div className="form-control w-full max-w-xs lg:w-6/12 px-2">
                    <label className="label">
                      <span className="label-text">Date and Time</span>
                    </label>
                    <DateTimePicker
                      // onChange={}
                      // handleDateChange={handleDateChange}
                      name="dateTime"
                      selectedDate={values.dateTime}
                      handleChange={(date) =>
                        setFieldValue("dateTime", date)
                      }
                      handleBlur={handleBlur}
                    />
                    {/* <input
                      type="text"
                      name="dateTime"
                      value={dateTime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    /> */}
                    {errors.dateTime && touched.dateTime ? (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.dateTime}
                        </span>
                      </label>
                    ) : null}
                  </div>
                  <div className="form-control w-full max-w-xs lg:w-6/12 px-2">
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea
                      placeholder="Description"
                      style={{height: "150px"}}
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="input input-bordered w-full max-w-xs"
                    ></textarea>
                    {errors.description && touched.description ? (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.description}
                        </span>
                      </label>
                    ) : null}
                  </div>
                  <br />
                  <br />
                  <div className="w-full mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary float-right"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default CreateAuction;
