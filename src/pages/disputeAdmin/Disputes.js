import Breadcrumb from "../../layouts/full/shared/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import TicketListing from "../../components/apps/tickets/TicketListing";
import TicketFilter from "../../components/apps/tickets/TicketFilter";
import ChildCard from "src/components/shared/ChildCard";
import DisputeItems from "./DisputeItems";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Tickets",
  },
];

const DisputeList = () => {
  return (
    <PageContainer title="Disputes" description="this is Note page">
      <Breadcrumb title="Tickets" />
      <ChildCard>
        {/* <TicketFilter /> */}
        <DisputeItems />
      </ChildCard>
    </PageContainer>
  );
};

export default DisputeList;
