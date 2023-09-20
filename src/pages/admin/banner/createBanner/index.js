import Nav from "../../../../components/headerNoAuth/index";
import Footer from "../../../../components/footer/Index";
import { useFormik } from "formik";
import { createBannerSchema } from "./createBannerSchema";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastify } from "../../../../helpers/toastify";
import Header from "../../../../components/header";

const initialValues = {
  name: "",
  picture: "",
  isActive: true,
  status: "ACTIVE",
};

const CreateBanner = () => {
  const { user } = useSelector((state) => ({ ...state }));

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
    validationSchema: createBannerSchema,
    onSubmit: async (values, action) => {
      const { picture } = values;
      const formData = new FormData();
      try {
        formData.append("file", picture);
        formData.append("upload_preset", "lita_app");
        const picRes = await axios.post(
          `https://api.cloudinary.com/v1_1/dc1bqtn7t/image/upload`,
          formData
        );
        try {
          values.picture = picRes.data.secure_url;
          const res = await axios.post(`${apiEndpoint}/createBanner`, values, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          toastify("Banner added!");
        } catch (error) {
          toastify(error);
        }
      } catch (error) {
        toastify(error);
      }
      action.resetForm();
    },
  });

  console.log(errors);

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
              <h2 className="card-title">Create Banner</h2>
              <div className="card-body">
                <div className="col-span-2 md:col-span-1 mx-2">
                  <form onSubmit={handleSubmit}>
                    <div class="flex flex-wrap justify-between">
                      <div className="form-control md:w-6/12 px-2">
                        <label className="label" htmlFor="bannerName">
                          <span className="label-text">Banner Name</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Banner Name"
                          name="name"
                          id="bannerName"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="input input-bordered"
                        />
                        {errors.name && touched.name ? (
                          <label className="label">
                            <span className="label-text-alt text-red-500">
                              {errors.name}
                            </span>
                          </label>
                        ) : null}
                      </div>
                      <ToastContainer />
                      {/* <div className="form-control md:w-6/12 px-2">
                        <label className="label" htmlFor="gameDescription">
                          <span className="label-text">Game Description</span>
                        </label>
                        <input
                          type="text"
                          name="gameDescription"
                          value={values.gameDescription}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Game Description"
                          className="input input-bordered"
                        />
                        <label className="label">
                          <span className="label-text-alt text-red-500">
                            {errors.gameDescription}
                          </span>
                        </label>
                      </div>
                      <div className="form-control md:w-6/12 px-2">
                        <label className="label" htmlFor="numberOfPlayers">
                          <span className="label-text">Number of Players</span>
                        </label>
                        <input
                          type="number"
                          name="numberOfPlayers"
                          value={values.numberOfPlayers}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Number of Players"
                          className="input input-bordered"
                        />
                      </div> */}
                      <div className="form-control md:w-6/12 px-2">
                        <label className="label" htmlFor="numberOfPlayers">
                          <span className="label-text">Banner Image</span>
                        </label>
                        <input
                          type="file"
                          name="picture"
                          value={values.numberOfPlayers}
                          onChange={(event) =>
                            setFieldValue("picture", event.target.files[0])
                          }
                          onBlur={handleBlur}
                          placeholder="Game Image"
                          className="input input-bordered"
                        />
                        {errors.picture && touched.picture ? (
                          <label className="label">
                            <span className="label-text-alt text-red-500">
                              {errors.picture}
                            </span>
                          </label>
                        ) : null}
                      </div>
                    </div>
                    <br />
                    <div className="w-full">
                      <button
                        type="submit"
                        className="btn btn-primary float-right"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateBanner;
