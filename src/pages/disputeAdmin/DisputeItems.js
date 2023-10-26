import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  IconButton,
  Chip,
  Stack,
  Avatar,
  Tooltip,
  TextField,
  Pagination,
  TableContainer,
} from "@mui/material";
// import {
//   fetchTickets,
//   DeleteTicket,
//   SearchTicket,
// } from "../../store/apps/tickets/TicketSlice";
import {
  fetchTickets,
  DeleteTicket,
  SearchTicket,
} from "src/store/myStore/dispute/DisputeSlice";
import { IconTrash } from "@tabler/icons";

const DisputeItems = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  //   const getVisibleTickets = (tickets, filter, ticketSearch) => {
  //     switch (filter) {
  //       case "total_tickets":
  //         return tickets.filter(
  //           (c) =>
  //             !c.deleted &&
  //             c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
  //         );

  //       case "Pending":
  //         return tickets.filter(
  //           (c) =>
  //             !c.deleted &&
  //             c.Status === "Pending" &&
  //             c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
  //         );

  //       case "Closed":
  //         return tickets.filter(
  //           (c) =>
  //             !c.deleted &&
  //             c.Status === "Closed" &&
  //             c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
  //         );

  //       case "Open":
  //         return tickets.filter(
  //           (c) =>
  //             !c.deleted &&
  //             c.Status === "Open" &&
  //             c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
  //         );

  //       default:
  //         throw new Error(`Unknown filter: ${filter}`);
  //     }
  //   };

  const tickets = useSelector((state) => state.ticketReducer.tickets);
  // getVisibleTickets(
  //   state.ticketReducer.tickets,
  //   state.ticketReducer.currentFilter,
  //   state.ticketReducer.ticketSearch
  // )
  //   return console.log(tickets);
  return (
    <Box mt={4}>
      {/* <Box sx={{ maxWidth: "260px", ml: "auto" }} mb={3}>
        <TextField
          size="small"
          label="Search"
          fullWidth
          onChange={(e) => dispatch(SearchTicket(e.target.value))}
        />
      </Box> */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Id</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Disputed By</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Event</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Host</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Date Time</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Event Type</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket, index) => (
              <TableRow
                key={ticket.index}
                component={Link}
                to={`/dispute-details/${ticket._id}/${ticket.eventId}`}
                hover
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box>
                    <Stack direction="row" gap="10px" alignItems="center">
                      <Avatar
                        src={ticket.disputeRaisedBy.picture}
                        alt={ticket.disputeRaisedBy.picture}
                        width="35"
                        sx={{
                          borderRadius: "100%",
                        }}
                      />
                      <Typography variant="h6">
                        {ticket.disputeRaisedBy.firstname}{" "}
                        {ticket.disputeRaisedBy.lastname}
                      </Typography>
                    </Stack>
                    <Typography
                      color="textSecondary"
                      noWrap
                      sx={{ maxWidth: "250px" }}
                      variant="subtitle2"
                      fontWeight="400"
                    >
                      {ticket.ticketDescription}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap="10px" alignItems="center">
                    <Typography variant="h6">{ticket.gameName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap="10px" alignItems="center">
                    <Avatar
                      src={ticket.eventUserDetails.picture}
                      alt={ticket.eventUserDetails.picture}
                      width="35"
                      sx={{
                        borderRadius: "100%",
                      }}
                    />
                    <Typography variant="h6">
                      {ticket.eventUserDetails.firstname}{" "}
                      {ticket.eventUserDetails.lastname}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      backgroundColor:
                        ticket.status === "open"
                          ? (theme) => theme.palette.success.light
                          : ticket.status === "resolved"
                          ? (theme) => theme.palette.warning.light
                          : ticket.status === "closed",
                    }}
                    size="small"
                    label={ticket.status}
                  />
                </TableCell>
                <TableCell>
                  <Typography>
                    {moment(ticket?.disputeCreatedAt).fromNow()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete Ticket">
                    <Typography>{ticket.eventType}</Typography>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box my={3} display="flex" justifyContent={"center"}>
        <Pagination count={10} color="primary" />
      </Box> */}
    </Box>
  );
};

export default DisputeItems;
