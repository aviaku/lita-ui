import * as React from "react";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import { Grid, Tabs, Tab, Box, CardContent, Divider } from "@mui/material";

// components
import AccountTab from "../../components/pages/account-setting/AccountTab";
import { IconArticle, IconBell, IconLock, IconUserCircle } from "@tabler/icons";
import BlankCard from "../../components/shared/BlankCard";
import NotificationTab from "../../components/pages/account-setting/NotificationTab";
import BillsTab from "../../components/pages/account-setting/BillsTab";
import SecurityTab from "../../components/pages/account-setting/SecurityTab";
import DisputeTab from "./DisputeTab";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Dispute Details",
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DisputeDetails = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <PageContainer
      title="Account Setting"
      description="this is Account Setting page"
    >
      {/* breadcrumb */}
      {/* <Breadcrumb title="Account Setting" items={BCrumb} /> */}
      {/* end breadcrumb */}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BlankCard>
            <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
              <Tabs
                value={value}
                onChange={handleChange}
                scrollButtons="auto"
                aria-label="basic tabs example"
                variant="scrollable"
              >
                <Tab
                  iconPosition="start"
                  icon={<IconUserCircle size="22" />}
                  label="Dispute"
                  {...a11yProps(0)}
                />
              </Tabs>
            </Box>
            <Divider />
            <CardContent>
              <TabPanel value={value} index={0}>
                <DisputeTab />
              </TabPanel>
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default DisputeDetails;
