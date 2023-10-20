import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";

export default function Games({
  infos,
  handleChange,
  max,
  setShowBio,
  updateDetails,
  placeholder,
  name,
  detail,
  setShow,
  rel,
  games,
}) {
  const apiEndpoint = process.env.REACT_APP_BACKEND_URL;

  const { user } = useSelector((state) => ({ ...state }));

  const [selectedGames, setSelectedGames] = useState([]);
  const [allGames, setAllGames] = useState([]);

  const gameList = async () => {
    try {
      const res = await axios.get(`${apiEndpoint}/getAllGames`);
      setAllGames(res.data);
    } catch (error) {
      console.log("🚀 ~ file: index.js:26 ~ gameList ~ error:", error);
    }
  };

  const onSelect = (selectedList, selectedItem) => {
    console.log(selectedList, selectedItem);
    setSelectedGames(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedGames(selectedList);
  };

  const handleSave = async () => {
    try {
      selectedGames.forEach(async (element) => {
        const res = await axios.post(
          `${apiEndpoint}/gamers/save`,
          { gameId: element._id, userId: user.id },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log("🚀 ~ file: index.js:17 ~ auctions ~ res:", res);
      });
      // setAuctions(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    gameList();
  }, []);
  return (
    <div className="add_bio_wrap">
      <Multiselect
        options={allGames} // Options to display in the dropdown
        // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
        onSelect={onSelect} // Function will trigger on select event
        onRemove={onRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
        showCheckbox={false}
      />
      {!detail && <div className="remaining">{max} characters remaining</div>}
      <div className="flex">
        <div className="flex flex_left">
          {/* <i className="public_icon"></i>Public */}
        </div>
        <div className="flex flex_right">
          <button
            className="gray_btn"
            onClick={() => (!detail ? setShowBio(false) : setShow(false))}
          >
            Cancel
          </button>
          <button
            className="blue_btn"
            onClick={() => {
              //   updateDetails();
              handleSave();
              setShow(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
