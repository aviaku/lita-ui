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

const Banners = () => {
    const apiEndpoint = process.env.REACT_APP_BACKEND_URL;
  const { user } = useSelector((state) => ({ ...state }));
  const [banners, setBanners] = useState([]);

const handleDelete = async (_id) => {
    try {
        const res = await axios.delete(`${apiEndpoint}/deleteBanner/${_id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        toastify("Banner deleted!");
        bannerList();
    } catch (error) {
        toastify("Something went wrong!");
        
    }
}

const bannerList = async () => {
  try {
    const res = await axios.get(`${apiEndpoint}/getAllBanners`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log("🚀 ~ file: index.js:17 ~ games ~ res:", res);
    setBanners(res.data);
  } catch (error) {
    console.log("🚀 ~ file: index.js:26 ~ gameList ~ error:", error);
  }
};

  useEffect(() => {
    bannerList();
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
              <h2 className="card-title"> Banners</h2>
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
                          <th>Action</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        {banners.map((banner, index) => (
                        <tr className="hover">
                          <th>{index + 1}</th>
                          <td>{banner.name}</td>
                          <td>
                            <img alt={banner.name} src={banner.picture} className="w-[100px]" />
                          </td>
                          <td>
                            <input type="checkbox" className="toggle" name={index} checked={banner.isActive} />
                          </td>
                          <td>
                            <div className="cursor-pointer" onClick={() => {handleDelete(banner._id);}}>
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

export default Banners;
