import Stat from "features/dashboard/Stat.jsx";
import PropTypes from "prop-types";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "utils/helpers.js";

Stats.propTypes = {
  bookings: PropTypes.array,
  confirmedStays: PropTypes.array,
  numDays: PropTypes.number,
  numCabins: PropTypes.number,
};

function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  const numBookings = bookings.length;
  const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const totalCheckIns = confirmedStays.length;
  const totalOccupation = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );
  const totalOccupationRate = totalOccupation / (numDays * numCabins);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check In's"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Number(totalOccupationRate * 100).toFixed(2)} %`}
      />
    </>
  );
}

export default Stats;
