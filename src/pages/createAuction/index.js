import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import axios from "axios";
import Nav from "../../components/headerNoAuth/index";
import Footer from "../../components/footer/Index";
import DateTimePicker from "./dateTimePicker";
import { toastify } from "../../helpers/toastify";
import { createAuctionSchema } from "./createAuctionSchema";
import { ToastContainer } from "react-toastify";
import Header from "../../components/header";
import Multiselect from "multiselect-react-dropdown";

const initialValues = {
  gameId: "",
  numberOfTickets: "",
  ticketPrice: "",
  hostShare: "",
  dateTime: "",
  description: "",
  eventMembers: [],
  percentageDivisionMode: "not_divided",
  isAuctionTicket: "false",
};

const CreateAuction = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [dateTime, setDateTime] = useState("");
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [numOfTickets, setNumOfTickets] = useState(0);
  const [percentageDivision, setPercentageDivision] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);

  let prizeDistributionInfo = "";

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
      var sum = percentageDivision.reduce((accumulator, currentValue) => {
        return parseInt(accumulator) + parseInt(currentValue);
      }, 0);

      console.log(sum);
      if ((values.percentageDivisionMode === "ranking") & (sum !== 100)) {
        return setErrorMsg("Sum of share percentage must be 100!");
      } else {
        setErrorMsg("");
      }

      const getGames = await axios.get(`${apiEndpoint}/getAllGames`);

      const selectedGame = getGames.data.filter(
        (games) => games._id === values.gameId
      );
      console.log(
        "🚀 ~ file: index.js:45 ~ onSubmit: ~ selectedGame:",
        getGames.data,
        values.gameId
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
        isAuctionTicket: values.isAuctionTicket === "false" ? false : true,
        rankingPercentages: percentageDivision.map((p, i) => {
          // let j = i + 1;
          return { ranking: i + 1, percentage: parseInt(p) };
        }),
      };
      console.log("🚀 ~ file: index.js:36 ~ onSubmit: ~ values:", data);

      try {
        const res = await axios.post(`${apiEndpoint}/events`, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        toastify("Tournament Created!");
      } catch (error) {
        toastify(error);
      }
      action.resetForm();
    },
  });

  if (values.percentageDivisionMode === "not_divided") {
    prizeDistributionInfo = "Prize will go to the host only";
  } else if (values.percentageDivisionMode === "same") {
    prizeDistributionInfo = "Prize will be go to all players equally";
  } else if (values.percentageDivisionMode === "ranking") {
    prizeDistributionInfo = "Host can define prize distribution for each rank";
  }

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

  const userList = async () => {
    try {
      const res = await axios.get(`${apiEndpoint}/getAllUsers`);
      setUsers(res.data);
    } catch (error) {
      console.log("🚀 ~ file: index.js:26 ~ gameList ~ error", error);
    }
  };

  const onSelect = (selectedList, selectedItem) => {
    const selectedListArr = selectedList.map((list) => ({
      amount: 0,
      user: list._id,
      createdAt: Date.now(),
    }));
    setSelectedUsers(selectedList);
    values.eventMembers = selectedListArr;
    console.log(values);
  };

  const onRemove = (selectedList, removedItem) => {
    const selectedListArr = selectedList.map((list) => ({
      amount: 0,
      user: list._id,
      createdAt: Date.now(),
    }));
    values.eventMembers = selectedListArr;
    setSelectedUsers(selectedList);
  };

  const handlePercentageDivision = (e) => {
    console.log(e.target.name, e.target.value);
    const rankPosition = e.target.name.split("_")[1];
    if (rankPosition !== -1) {
      const percentageDivisionArr = percentageDivision;
      percentageDivisionArr[rankPosition] = e.target.value;
      setPercentageDivision([...percentageDivisionArr]);
    }
    // const oldPercentageDivision = [...percentageDivision]
    // if(percentageDivision[rankPosition]) {
    // setPercentageDivision(percentageDivision.splice(rankPosition, 0))
    // }
    // setPercentageDivision(percentageDivision.splice(rankPosition, 0, e.target.value));
    // setPercentageDivision([
    //   ...percentageDivision,
    //   e.target.value,
    // ]);
    console.log(percentageDivision, rankPosition);
  };

  useEffect(() => {
    gameList();
    userList();
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
                  <div className="form-control w-full max-w-xs lg:w-[48%] px-2">
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
                      {games.map((game) => (
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
                  <div className="form-control w-full max-w-xs lg:w-[48%] px-2">
                    <label className="label">
                      <span className="label-text">Number of Tickets</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Number of Tickets"
                      name="numberOfTickets"
                      value={values.numberOfTickets}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onWheel={(e) => e.target.blur()}
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.numberOfTickets && touched.numberOfTickets ? (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.numberOfTickets}
                        </span>
                      </label>
                    ) : null}
                  </div>
                  <div className="form-control w-full max-w-xs lg:w-[48%] px-2">
                    <label className="label">
                      <span className="label-text">Ticket Price</span>
                    </label>
                    <input
                      type="text"
                      placeholder="1000"
                      name="ticketPrice"
                      value={values.ticketPrice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.ticketPrice && touched.ticketPrice ? (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.ticketPrice}
                        </span>
                      </label>
                    ) : null}
                  </div>
                  <div className="form-control w-full max-w-xs lg:w-[48%] px-2">
                    <label className="label">
                      <span className="label-text">Date and Time</span>
                    </label>
                    <DateTimePicker
                      // onChange={}
                      // handleDateChange={handleDateChange}
                      name="dateTime"
                      selectedDate={values.dateTime}
                      handleChange={(date) => setFieldValue("dateTime", date)}
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
                  <div className="form-control w-full max-w-xs lg:w-[48%] px-2">
                    <label className="label">
                      <span className="label-text">Ticket Selling Type</span>
                    </label>
                    <select
                      className="select select-bordered"
                      name="isAuctionTicket"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value={false} selected>
                        Direct Selling
                      </option>
                      <option value={true}>Auction</option>
                    </select>
                    {errors.isAuctionTicket && touched.isAuctionTicket ? (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.isAuctionTicket}
                        </span>
                      </label>
                    ) : null}
                  </div>
                  {values.numberOfTickets ? (
                    <div className="form-control w-full max-w-xs lg:w-[48%] px-2">
                      <label className="label">
                        <span className="label-text">Allot Tickets to</span>
                      </label>
                      <Multiselect
                        options={users} // Options to display in the dropdown
                        // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                        onSelect={onSelect} // Function will trigger on select event
                        onRemove={onRemove} // Function will trigger on remove event
                        displayValue="username" // Property name to display in the dropdown options
                        showCheckbox={false}
                      />
                      {errors.ticketPrice && touched.ticketPrice ? (
                        <label className="label">
                          <span className="label-text-alt text-red-500">
                            {errors.ticketPrice}
                          </span>
                        </label>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="form-control w-full max-w-xs lg:w-[48%] px-2">
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea
                      placeholder="Description"
                      style={{ height: "150px" }}
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
                  <div className="form-control w-full max-w-xs lg:w-[48%] px-2">
                    <label className="label">
                      <span className="label-text">Host Share</span>
                    </label>
                    <input
                      type="text"
                      placeholder="1000"
                      name="hostShare"
                      value={values.hostShare}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.hostShare && touched.hostShare ? (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.hostShare}
                        </span>
                      </label>
                    ) : null}
                  </div>
                  <div className="form-control w-full max-w-xs lg:w-[48%] px-2">
                    <label className="label">
                      <span className="label-text">Prize Distribution</span>
                    </label>
                    <select
                      className="select select-bordered"
                      name="percentageDivisionMode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="not_divided" selected>
                        Not Divided
                      </option>
                      <option value="same">Equaly Divided</option>
                      <option value="ranking">Ranking Wise</option>
                      {/* <option value="different">Custom</option> */}
                    </select>
                    <label className="label">
                      <span className="label-text-alt">
                        {prizeDistributionInfo}
                      </span>
                    </label>
                    {errors.percentageDivisionMode &&
                    touched.percentageDivisionMode ? (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.percentageDivisionMode}
                        </span>
                      </label>
                    ) : null}
                  </div>
                  {values.percentageDivisionMode === "ranking" &&
                    values.numberOfTickets && (
                      <div className="form-control w-full max-w-xs lg:w-[48%] px-2">
                        <label className="label">
                          <span className="label-text">Number of Tickets</span>
                        </label>
                        {[...Array(values.numberOfTickets)].map((e, i) => (
                          <input
                            type="number"
                            name={`playerPercentage_${[i]}`}
                            // value={values.numberOfTickets}
                            placeholder={`Rank ${i + 1} share`}
                            // onChange={(e) => handlePercentageDivision(e)}
                            onBlur={(e) => handlePercentageDivision(e)}
                            className="input input-bordered w-full max-w-xs"
                            onWheel={(e) => e.target.blur()}
                            required
                          />
                        ))}

                        {errors.numberOfTickets && touched.numberOfTickets ? (
                          <label className="label">
                            <span className="label-text-alt text-red-500">
                              {errors.numberOfTickets}
                            </span>
                          </label>
                        ) : null}
                      </div>
                    )}
                  {errorMsg && (
                    <p className="text-red-700 font-semibold">{errorMsg}</p>
                  )}
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
