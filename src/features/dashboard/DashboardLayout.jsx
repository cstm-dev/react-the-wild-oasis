import useGetCabins from "features/cabins/useGetCabins.js";
import SalesChart from "features/dashboard/SalesChart.jsx";
import Stats from "features/dashboard/Stats.jsx";
import useRecentBookings from "features/dashboard/useRecentBookings.js";
import useRecentStays from "features/dashboard/useRecentStays.js";
import styled from "styled-components";
import Spinner from "ui/Spinner.jsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    data: lastBookings,
    isLoading: isLoadingLastBookings,
    numDays,
  } = useRecentBookings();
  const {
    data: lastStays,
    isLoading: isLoadingLastStays,
    confirmedStays,
  } = useRecentStays();
  const { data: cabins, isLoading: isLoadingCabins } = useGetCabins();

  if (isLoadingLastBookings || isLoadingLastStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={lastBookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        numCabins={cabins.length}
      />

      <SalesChart bookings={lastBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
