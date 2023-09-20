import * as Yup from "yup";

export const createGameSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter game name"),
  numberOfPlayers: Yup.number()
    .min(2)
    .max(25)
    .required("Please enter number of players"),
  picture: Yup.mixed()
    .test(
      "FILE_SIZE",
      "File is too large",
      (value) => value && value.size < 2000000
    )
    .test(
      "FILE_TYPE",
      "Invalid File",
      (value) =>
        value && ["image/png", "image/jpeg", "image/webp"].includes(value.type)
    ),
});
