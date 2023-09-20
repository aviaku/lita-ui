import { ToastContainer, toast } from "react-toastify";

export const toastify = (msg) => {
    toast(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
};
