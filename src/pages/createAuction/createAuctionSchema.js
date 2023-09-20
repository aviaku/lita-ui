import * as Yup from "yup";

export const createAuctionSchema = Yup.object({
  gameId: Yup.string().min(2).required("Select game"),
  basePrice: Yup.number().required("Enter base price"),
  dateTime: Yup.date().required("Choose auction date & time")
});
