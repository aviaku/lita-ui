import * as Yup from "yup";

export const createBannerSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter game name"),
  picture: Yup.mixed()
    .test(
      "FILE_SIZE",
      "File is too large",
      (value) => value && value.size < 2000000
    )
    .test(
      "FILE_TYPE",
      "Invalid File",
      (value) => value && ["image/png", "image/jpeg"].includes(value.type)
    ),
});
