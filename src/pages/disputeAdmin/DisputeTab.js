import React, { useState, useEffect } from "react";
import {
  CardContent,
  Grid,
  Typography,
  MenuItem,
  Box,
  Avatar,
  Button,
  Stack,
  CardMedia,
  FormControlLabel,
  RadioGroup,
  Divider,
} from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";

// components
import BlankCard from "../../components/shared/BlankCard";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "../../components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "../../components/forms/theme-elements/CustomSelect";
import CustomRadio from "src/components/forms/theme-elements/CustomRadio";
import { use } from "i18next";
import { set } from "lodash";

const DisputeTab = () => {
  const [type, setType] = useState("");
  const [ticketInfo, setTicketInfo] = useState(null);
  const [refundAmount, setRefundAmount] = useState(0);
  const { disputeId, eventId } = useParams();

  const user = JSON.parse(Cookies?.get("user")) || null;
  console.log("user", user);

  const getTicketInfo = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/event/dispute/${disputeId}/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setTicketInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let values = {};
    let endpoint = "";
    if (type === "hold") {
      values = { eventId, disputeId };
      endpoint = `/event/${eventId}/dispute/${disputeId}/hold-event`;
    } else if (type === "refund") {
      values = {
        eventId,
        disputeId,
        refundUserId: ticketInfo?.event?.user?._id,
        refundReciveUsrId: ticketInfo?.dispute?.raisedBy?.id,
        amount: refundAmount,
      };
      endpoint = `/event/${eventId}/dispute/${disputeId}/initiate-refund`;
    } else if (type === "reupload") {
      values = { eventId, disputeId };
      endpoint = `/event/${eventId}/dispute/${disputeId}/ask-host-to-reupload`;
    } else if (type === "close") {
      values = { eventId, disputeId };
      endpoint = `/event/${eventId}/dispute/${disputeId}/close-dispute`;
    }
    // Make axios post request to backend to create dispute
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}${endpoint}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(data);
  };

  useEffect(() => {
    getTicketInfo();
  }, []);

  //   return <> </>;

  return (
    <Grid container spacing={3}>
      {/* Change Profile */}
      <Grid item xs={12} lg={12}>
        <BlankCard>
          <CardContent>
            <CardMedia
              component="img"
              height="440"
              image={
                ticketInfo?.dispute?.image
                  ? ticketInfo?.dispute?.image
                  : "https://images.unsplash.com/photo-1556742049-887f6717d7e5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjdG9yeSUyMGV2ZW50fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
              }
              alt="green iguana"
            />
          </CardContent>
        </BlankCard>
      </Grid>
      {/*  Change Password */}
      <Grid item xs={12} lg={12}>
        <BlankCard>
          <CardContent>
            <Box>
              <Box p={3}>
                <Box display="flex" alignItems="center">
                  <Avatar
                    alt={ticketInfo?.event?.game?.picture}
                    src={ticketInfo?.event?.game?.picture}
                    sx={{ width: "72px", height: "72px" }}
                  />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" mb={0.5}>
                      {ticketInfo?.event?.game.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      {ticketInfo?.event?.dateTime}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                      {ticketInfo?.company}
                    </Typography> */}
                  </Box>
                </Box>
                <Grid container>
                  <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Base Price
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                      {ticketInfo?.event?.ticketPrice}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Descioption
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                      {ticketInfo?.event?.description}
                    </Typography>
                  </Grid>
                  <Grid item lg={12} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Participant?
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                      {ticketInfo?.event?.eventMembers?.filter(
                        (member) =>
                          member.user === ticketInfo?.dispute?.raisedBy?.id
                      ).length > 0 ||
                      ticketInfo?.event?.eligibleBids?.filter(
                        (member) =>
                          member.user === ticketInfo?.dispute?.raisedBy?.id
                      ).length > 0
                        ? "Yes"
                        : "No"}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Donation
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                      {console.log(
                        "dddd",
                        ticketInfo?.event?.donations?.filter(
                          (member) =>
                            member.user === ticketInfo?.dispute?.raisedBy?.id
                        )
                      )}
                      {ticketInfo?.event?.donations?.filter(
                        (member) =>
                          member.user === ticketInfo?.dispute?.raisedBy?.id
                      ).length > 0
                        ? ticketInfo?.event?.donations
                            ?.filter(
                              (member) =>
                                member.user ===
                                ticketInfo?.dispute?.raisedBy?.id
                            )
                            .map((donation) => (
                              <p>
                                Donated INR {donation?.amount} to{" "}
                                {donation?.type}
                              </p>
                            ))
                        : "No Donations"}
                    </Typography>
                  </Grid>
                  {/* <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Company
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                      {ticketInfo?.company}
                    </Typography>
                  </Grid>
                  <Grid item lg={12} xs={12} mt={4}>
                    <Typography variant="body2" mb={1} color="text.secondary">
                      Notes
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5}>
                      {ticketInfo?.notes}
                    </Typography>
                  </Grid> */}
                </Grid>
              </Box>
              <Divider />
            </Box>
            <br />
            {ticketInfo && ticketInfo?.dispute?.status === "open" ? (
              <form onSubmit={handleSubmit}>
                <Typography variant="h5" mb={1}>
                  Action
                </Typography>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                >
                  {console.log("a")}
                  {ticketInfo?.dispute?.type === "donation" &&
                    ticketInfo?.event?.donations.some(
                      (donation) =>
                        donation?.user === ticketInfo?.dispute?.raisedBy?.id
                    ) && (
                      <FormControlLabel
                        value="refund"
                        name="action"
                        // checked={type === "refund"}
                        control={<CustomRadio bgcolor="#615DFF" />}
                        label="Refund"
                        labelPlacement="end"
                        onChange={(e) => setType(e.target.value)}
                      />
                    )}
                  <FormControlLabel
                    value="hold"
                    name="action"
                    // checked={type === "hold"}
                    control={<CustomRadio bgcolor="#615DFF" />}
                    label="Hold Event"
                    labelPlacement="end"
                    onChange={(e) => setType(e.target.value)}
                  />
                  {ticketInfo.event.status === "RESULT_VERIFICATION" && (
                    <FormControlLabel
                      value="reupload"
                      name="action"
                      // checked={type === "reupload"}
                      control={<CustomRadio bgcolor="#615DFF" />}
                      label="Reupload Result"
                      labelPlacement="end"
                      onChange={(e) => setType(e.target.value)}
                    />
                  )}
                  <FormControlLabel
                    value="close"
                    name="action"
                    // checked={type === "close"}
                    control={<CustomRadio bgcolor="#615DFF" />}
                    label="Close Dispute"
                    labelPlacement="end"
                    onChange={(e) => setType(e.target.value)}
                  />
                </RadioGroup>
                <br />
                {type === "refund" && (
                  <CustomTextField
                    label="Refund Amount"
                    name="refundAmount"
                    type="number"
                    fullWidth
                    onChange={(e) => setRefundAmount(e.target.value)}
                  />
                )}
                <br />
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "end" }}
                  mt={3}
                >
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                  <Button size="large" variant="text" color="error">
                    Cancel
                  </Button>
                </Stack>
              </form>
            ) : (
              <Typography color="textSecondary" mb={3}>
                Dispute is closed
              </Typography>
            )}
          </CardContent>
        </BlankCard>
      </Grid>
    </Grid>
  );
};

export default DisputeTab;
