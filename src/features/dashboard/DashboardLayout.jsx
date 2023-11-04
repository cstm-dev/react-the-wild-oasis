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
  const { data: lastBookings, isLoading: isLoadingLastBookings } =
    useRecentBookings();
  const {
    data: lastStays,
    isLoading: isLoadingLastStays,
    confirmedStays,
  } = useRecentStays();

  if (isLoadingLastBookings || isLoadingLastStays) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
