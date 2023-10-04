import * as Yup from "yup";

export const createAuctionSchema = Yup.object({
  gameId: Yup.string().min(2).required("Select game"),
  ticketPrice: Yup.number().required("Enter ticket price"),
  numberOfTickets: Yup.number().required("Enter number of tickets"),
  dateTime: Yup.date().required("Choose auction date & time"),
});
